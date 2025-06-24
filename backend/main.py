from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from io import BytesIO
from ultralytics import YOLO
from PIL import Image
import base64
import uvicorn

# Initialize FastAPI app
app = FastAPI()

# Allow CORS for all origins (modify for production to restrict domains)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the YOLO model
#model = YOLO("C:/Users/KTI/Projects/uavdetect/version2/verr/scripts/runs/detect/train/weights/best.pt")
model = YOLO("C:/Users/KTI/Projects/react-fastapi/backend/model/best.pt")

# Class names mapping
original_class_names = ['BRT', 'DOM', 'DST', 'GHM', 'HMN', 'LBT']
custom_class_names = ["Tank", "DOM", "Partlayış", "GHM", "Əsgər", "Hərbi texnika"]
class_name_mapping = {original: new for original, new in zip(original_class_names, custom_class_names)}

@app.post("/predict/")
async def predict(files: List[UploadFile] = File(...)):
    """
    Predict objects in uploaded images using YOLO.
    """
    results_data = []

    for file in files:
        # Read the uploaded file
        image_data = await file.read()
        image = Image.open(BytesIO(image_data))

        # Save original image as Base64
        original_img_bytes = BytesIO()
        image.save(original_img_bytes, format="PNG")
        original_img_bytes.seek(0)
        original_image_base64 = base64.b64encode(original_img_bytes.getvalue()).decode('utf-8')

        # Run the YOLO model
        results = model(image)

        # Process results
        for result in results:
            results_str = result.verbose()
            results_str = results_str.rstrip()

            if results_str.endswith(','):
                results_str = results_str[:-1]

            for original_class, new_class in class_name_mapping.items():
                results_str = results_str.replace(f"{original_class}s", new_class)
                results_str = results_str.replace(original_class, new_class)

        results[0].names = {i: custom_class_names[i] for i in range(len(custom_class_names))}
        result_image = results[0].plot(conf=False)

        # Convert numpy array to PIL Image and save as Base64
        result_image_pil = Image.fromarray(result_image)
        result_img_bytes = BytesIO()
        result_image_pil.save(result_img_bytes, format="PNG")
        result_img_bytes.seek(0)
        result_image_base64 = base64.b64encode(result_img_bytes.getvalue()).decode('utf-8')

        # Append results data
        results_data.append({
            "original_image": original_image_base64,
            "result_image": result_image_base64,
            "results_str": results_str
        })

    return JSONResponse(content=results_data)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5005)
