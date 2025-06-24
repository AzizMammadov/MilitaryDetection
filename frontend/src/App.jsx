import React, { useState ,useEffect } from "react";
import axios from "axios";
import "./App.css";
import logo from "./assets/logo.png";
import FileUploader from "./components/FileUploader";
import StartButton from "./components/StartButton";
import LoadingSpinner from "./components/LoadingSpinner";
import Typewriter from 'typewriter-effect';

function App() {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataUploaded, setDataUploaded] = useState(false);
  
  const handleFileChange = (event) => {
    setResults([]);
    const selectedFiles = event.target.files;
    setFiles(selectedFiles);
    setDataUploaded(selectedFiles.length > 0); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("files", file));
    setLoading(true);
    setResults([]);

    try {
      const response = await axios.post("http://127.0.0.1:5005/predict/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResults(response.data);
    } catch (error) {
      alert("Error processing images");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main> 
      <img id="logo" src={logo} alt="Logo" />
      <h1>Süni İntellekt əsasında hədəflərin dəqiqləşdirilməsi</h1>
      <p>
      <Typewriter
        options={{
          delay: 30
        }}
        onInit={(typewriter) => {
          typewriter.typeString('Döyüş texnikalarının və canlı qüvvələrin aşkar edilməsi.')
            .start();
        }}
      />
      </p>

      <form id="uploadForm" onSubmit={handleSubmit}>
        <FileUploader onChange={handleFileChange} selectedFilesCount={files.length}/> 
        {dataUploaded && <StartButton text="Başla" type="submit" onClick={handleSubmit} style={{ marginTop: "20px" }} variant="contained"/>}
      </form>

      {loading && <LoadingSpinner />}

      <div id="results" style={{ display: results.length ? "visible" : "visible" }}>
        {results.map((data, index) => (
          <div key={index} className="result-pair">
            <div>
              <h3>Yüklənən Şəkil:</h3>
              <img
                src={`data:image/png;base64,${data.original_image}`}
                alt="Original"
              />
            </div>
            <div>
              <h3>Nəticə: {data.results_str}</h3>
              <img
                src={`data:image/png;base64,${data.result_image}`}
                alt="Processed"
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
