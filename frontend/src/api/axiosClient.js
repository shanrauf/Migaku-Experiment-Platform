import axios from 'axios';

const baseDomain =
  process.env.NODE_ENV == 'development'
    ? 'localhost:3000'
    : window.location.origin + '/backend';
// const baseDomain = 'http://localhost:3000'; // replace once setup webpack + node
// in dev, will use webpack dev server w proxy to node api; in prod, will serve index file and run node server
const baseURL = `${baseDomain}/api`;

console.log(baseURL);

export default axios.create({
  baseURL,
  headers: {
    // "Authorization": "Bearer xxxxx"
    'Access-Control-Allow-Origin': '*'
  }
});
