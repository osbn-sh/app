import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APIADDR,
});

api.interceptors.request.use((config) => {
  console.log("🙈 start", typeof window === "undefined");

  if (typeof window === "undefined") return config;

  const token = localStorage.getItem("authCode");

  // اول Bearer Token
  if (token) {
    config.headers.setAuthorization(`Bearer ${token}`);
    return config;
  }

  // اگر Token نبود، Basic Auth
  const username = "a@a.aa";
  const password = "1";

  if (username && password) {
    const basicAuth = btoa(`${username}:${password}`);
    config.headers.setAuthorization(`Basic ${basicAuth}`);
  }

  return config;
});
