from ultralytics import YOLO

# Load YOLOv8 model
model = YOLO("C:/Users/KTI/Projects/react-fastapi/backend/model/best.pt")  # Replace with your model
# Export to ONNX
model.export(format="onnx")
