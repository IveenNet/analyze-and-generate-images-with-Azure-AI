// App.js
import React, { useState, useEffect } from "react";
import generateImage, {
  isConfigured as isGenerateImageConfigured,
} from "./azure-image-generation";
import analyzeImage, {
  isConfigured as isAnalyzeImageConfigured,
} from "./azure-image-analysis";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [imageData, setImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isConfigured, setIsConfigured] = useState(true); // Estado para la comprobación de configuración

  // Comprobar la configuración al cargar la aplicación
  useEffect(() => {
    setIsConfigured(isGenerateImageConfigured() && isAnalyzeImageConfigured());
  }, []);

  const handleAnalyzeClick = async () => {
    try {
      const result = await analyzeImage(prompt);
      setAnalysisResult(result);
    } catch (error) {
      console.error("Error al analizar la imagen:", error);
    }
  };

  const handleGenerateClick = async () => {
    try {
      setIsLoading(true);
      const data = await generateImage(prompt);
      setImageData(data);
    } catch (error) {
      console.error("Error al generar la imagen:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConfigured) {
    // Si no está configurado, no mostrar la interfaz de usuario
    return (
      <div className="warning-message">
        La aplicación no está configurada correctamente. Por favor, configure
        las variables de entorno.
      </div>
    );
  } else {
    return (
      <div>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a prompt for the image"
        />
        <button onClick={handleAnalyzeClick}>Analizar Imagen</button>
        <button onClick={handleGenerateClick} disabled={isLoading || !prompt}>
          {isLoading ? "Generating..." : "Generate"}
        </button>
        {analysisResult && <pre>{JSON.stringify(analysisResult, null, 2)}</pre>}

        {imageData && <DisplayResults imageData={imageData} />}
      </div>
    );
  }
};

const DisplayResults = ({ imageData }) => {
  // Asumiendo que la API de OpenAI devuelve un objeto con una URL de la imagen generada.
  const imageUrl = imageData?.data[0]?.url; // Asegúrate de que esta ruta corresponda con la estructura de la respuesta de la API de OpenAI.
  return imageUrl ? <img src={imageUrl} alt="Generated" /> : null;
};

export default App;
