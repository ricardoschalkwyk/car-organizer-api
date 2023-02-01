const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const api = require("./api");

// Init Express
const app = express();

// App Middleware

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

// Routes
app.use("/api", api);

module.exports = app;
