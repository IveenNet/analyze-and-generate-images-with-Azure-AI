// azure-image-generation.js
import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY
const openAIEndpoint = 'https://api.openai.com/v1/images/generations'; // Este es el endpoint de la API de OpenAI para generación de imágenes.

const generateImage = async (prompt) => {
  try {
    const response = await axios({
      method: 'post',
      url: openAIEndpoint,
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: {
        model: 'dall-e-3', // Especifica el modelo aquí
        prompt: prompt,
        n: 1 // Este es el número de imágenes que deseas generar.
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al generar la imagen:', error);
    return null;
  }
};


export default generateImage;

// azure-image-generation.js y azure-image-analysis.js
export function isConfigured() {
  return OPENAI_API_KEY;
}

