import axios from "axios";

const baseURL =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_API_SSR_URL
    : process.env.NEXT_PUBLIC_API_URL;

export const $api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 5000,
});
