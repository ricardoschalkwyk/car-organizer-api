const express = require("express");

const cars = require("./cars/cars.controller");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/cars", cars);

module.exports = router;
