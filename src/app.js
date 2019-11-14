const express = require("express");
const bodyParser = require("body-parser");
const app = express();

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
let server = app.listen(process.env.PORT || 8080, function() {
  let port = server.address().port;
  console.log("App now running on port", port);
});

// Initialize database
// ...

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
