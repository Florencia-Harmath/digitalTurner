// src\helpers\api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => response, error => {
  return Promise.reject(error);
});

export default api;
