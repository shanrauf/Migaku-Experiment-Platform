import axios from "axios";

// const baseDomain =
//   process.env.NODE_ENV == "development"
//     ? "localhost:3000"
//     : window.location.origin;
const baseDomain = "54.197.11.54/backend";
const baseURL = `${baseDomain}/api`;

console.log(baseURL);

export default axios.create({
  baseURL,
  headers: {
    // "Authorization": "Bearer xxxxx"
    "Access-Control-Allow-Origin": "*"
  }
});
