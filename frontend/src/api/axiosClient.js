import axios from 'axios';

const baseDomain = window.location.origin; // dev: localhost:8080
const baseURL = `${baseDomain}/api`;

console.log(baseURL);

export default axios.create({
  baseURL,
  headers: {
    // "Authorization": "Bearer xxxxx"
    'Access-Control-Allow-Origin': '*'
  }
});
