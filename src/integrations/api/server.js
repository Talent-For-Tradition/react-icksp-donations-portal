const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const server = express();
const router = require("./api-router");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', router);

server.get('/', function (req, res) {
  res.send('¡Viva Cristo Rey!')
})

module.exports = server;
