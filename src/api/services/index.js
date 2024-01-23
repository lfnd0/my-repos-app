import axios from "axios";

const baseURL = "https://api.github.com";
const API = axios.create({
  baseURL,
});

export default API;
