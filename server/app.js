const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, "index.html");

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const config = require("../webpack.config.js");
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
  webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  })
);

// Webpack HMR
app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static(DIST_DIR));
app.use(bodyParser.json());

// CORS Middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization"
  );
  next();
});

//Set up server
let server = app.listen(process.env.PORT || 3000, function() {
  let port = server.address().port;
  console.log("App now running on port", port);
});

//GET API
app.get("/api/users", function(req, res) {
  // let query = "select * from users";
  res.send("Hiya!");
});

// create user
app.post("/api/users", function(req, res) {
  // let query = "select * from users";
  res.send("Success!");
});

app.get("/api/users/:user", function(req, res) {
  let user = req.params.user;
  // let query = "select * from [user]";
  res.send(user);
});

app.get("/", (req, res) => {
  res.sendFile(HTML_FILE);
});
