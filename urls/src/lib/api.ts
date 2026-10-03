import axios from 'axios'
import { getAccessToken } from '#/contexts/authContext'

const api = axios.create({ baseURL: "https://localhost:5001" });

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

export default api;