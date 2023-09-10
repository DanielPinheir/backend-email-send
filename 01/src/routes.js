const express = require("express");

const {
  cadastrarEmail,
  enviarNewsletter,
} = require("./controllers/newsletter");

const routes = express();

routes.post("/emails", cadastrarEmail);
routes.post("/newsletter", enviarNewsletter);

module.exports = routes;
