import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_REACT_APP_API_URL,
  });