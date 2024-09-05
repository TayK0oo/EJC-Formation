// src/services/wordpress.ts
import axios from 'axios';

const API_URL = 'http://votre-site-wordpress.com/wp-json/wp/v2';

export const getWordPressContent = async (contentType: string) => {
  try {
    const response = await axios.get(`${API_URL}/${contentType}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération du contenu WordPress:', error);
    throw error;
  }
};