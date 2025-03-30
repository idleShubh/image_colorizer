import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const colorizeImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await api.post('/colorize', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to colorize image');
  }
};

export const getImage = async (imageId) => {
  try {
    const response = await api.get(`/images/${imageId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to fetch image');
  }
};

export default api; 