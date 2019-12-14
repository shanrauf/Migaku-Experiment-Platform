import axios from "axios";

const baseDomain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.SERVER_URL_PROD;
const baseURL = `${baseDomain}/api`;
// ALL DEFUALT CONFIGURATION HERE
export default axios.create({
  baseURL,
  headers: {
    // "Authorization": "Bearer xxxxx"
  }
});
