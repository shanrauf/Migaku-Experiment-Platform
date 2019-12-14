import axios from "axios";

const baseDomain =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "54.197.11.54/backend"; // hard-coded for now since .env isn't in Github for Netlify to catch
const baseURL = `${baseDomain}/api`;

console.log(baseURL);

export default axios.create({
  baseURL,
  headers: {
    // "Authorization": "Bearer xxxxx"
    "Access-Control-Allow-Origin": "*"
  }
});
