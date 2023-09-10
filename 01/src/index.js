require("dotenv").config();
const express = require("express");
const login = require("./controllers/login");

const app = express();

app.use(express.json());

app.post("/login", login);

app.listen(process.env.PORT);
