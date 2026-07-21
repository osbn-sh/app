import axios from "axios";
const IsProduction = process.env.NEXT_PUBLIC_ENVIROMENT == "1"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIADDR,
  withCredentials: IsProduction,
});

api.interceptors.request.use((config) => {

  if (typeof window === "undefined") return config;

  const token = localStorage.getItem("authCode");

  // اول Bearer Token
  if (token) {
    config.headers.setAuthorization(`Bearer ${token}`);
    return config;
  }

  if (!IsProduction) {
    const username = "a@a.aa";
    const password = "1";

    if (username && password) {
      const basicAuth = btoa(`${username}:ص${password}`);
      config.headers.setAuthorization(`Basic ${basicAuth}`);
    }
  }

  return config;
});
