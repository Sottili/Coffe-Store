import axios from "axios";

export const api = axios.create({
  baseURL: "https://api-coffe-store-9au4.vercel.app",
});
