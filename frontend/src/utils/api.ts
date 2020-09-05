import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:5000',
  timeout: 1000,
});

export const setApiToken = (token: string | null) => {
  api.defaults.headers.common.Authorization = token ? `JWT ${token}` : null;
};

export default api;
