import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.8:3000",
  timeout: 15000,
});

export default api;
