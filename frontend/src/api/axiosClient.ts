import axios from "axios";
import store from "@/store";

const baseDomain = window.location.origin; // dev: localhost:8080
const baseURL = `${baseDomain}/api`;

const axiosClient = axios.create({
  baseURL,
  headers: {
    // "Authorization": "Bearer xxxxx"
    "Access-Control-Allow-Origin": "*"
  }
});

axiosClient.interceptors.response.use(
  response => {
    return response; // can make further edits to response object if you want
  },
  err => {
    store.commit("error", err); // perhaps create more sophisicated error handling (i.e tailored msgs based on errors/status codes)
    return Promise.reject(err);
  }
);

export default axiosClient;
