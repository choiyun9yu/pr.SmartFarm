const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 8080;
app.set("port", port);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(__dirname + "/router/stylesheets"));
app.use(express.urlencoded({ extended: true }));
// router.js 참조
const router = require("./router/router.js");
const body_parser = require("body-parser");
var cors = require("cors");
app.use(cors());
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());
app.use(router);
// port 번호 8080
app.listen(port, () => {
  console.log(`this server listening on ${port}`);
});
