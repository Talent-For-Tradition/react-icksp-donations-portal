const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();
const router = require("./api-router");

// stripe-ware
const keyPublishable = process.env.PUBLISHABLE_KEY;
// https://stripe.com/docs/legacy-checkout/express#step-1-install-dependencies
server.set("view engine", "pug");
server.use(require("body-parser").urlencoded({extended: false}));

// middle-ware
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) =>
  res.render("index.pug", {keyPublishable}));

server.use('/api', router);
// server.get('/', function (req, res) {
// })

module.exports = server;
