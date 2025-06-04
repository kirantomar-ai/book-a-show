// src/services/apiClient.js
import axios from "axios";

// const API_BASE_URL = "http://localhost:5000";
const API_BASE_URL = "";

const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;

export const tmdbClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: "01e1cb26f7eb49c82a1a8895a857db93",
    language: 'en-US',
  },
});