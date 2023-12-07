// azure-image-analysis.js
import axios from 'axios';

const AZURE_CV_API_KEY = process.env.REACT_APP_AZURE_CV_API_KEY;
const AZURE_CV_ENDPOINT = process.env.REACT_APP_AZURE_CV_ENDPOINT;

const analyzeImage = async (imageUrl) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${AZURE_CV_ENDPOINT}?visualFeatures=Categories,Description,Color&language=es`,
      headers: { 
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': AZURE_CV_API_KEY
      },
      data: {
        url: imageUrl
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error al analizar la imagen:", error);
    return error;
  }
};

export default analyzeImage;

// azure-image-generation.js y azure-image-analysis.js
export function isConfigured() {
  return AZURE_CV_API_KEY && AZURE_CV_ENDPOINT;
}


