const express = require("express");
const carsService = require("./cars.service");

const router = express.Router();

// GET request
router.get("/", async (req, res) => {
  const data = await carsService.findAll(req.query);

  res.json(data);
});

router.get("/seed", async (req, res) => {
  const data = await carsService.seed();

  res.json(data);
});

// GET request
// This request finds cars older than 5 years
router.get("/models", async (req, res) => {
  const data = await carsService.findModels();
  res.json(data);
});

// POST request
// Creates one new car
router.post("/", async (req, res) => {
  const data = await carsService.insertOne(req.body);

  if (data.length === 0) {
    res.status(404).json({
      message: "Could not find car",
    });
  }

  res.json(data);
});

// PUT request
// This will update more than one car at a time
router.put("/bulk-update", async (req, res) => {
  const { cars = [] } = req.body;

  const data = await carsService.updateMany(cars);

  res.json(data);
});

// PUT request
// This will update one cars values
router.put("/:id", async (req, res) => {
  const data = await carsService.updateOne(req.params.id, req.body);

  if (!data) {
    res.status(404).json({
      message: "Could not find car",
    });
  }

  res.json(data);
});

// DELETE request
// This will delete multiple cars
router.delete("/bulk", async (req, res) => {
  const { ids = [] } = req.body;

  const cars = await carsService.deleteMany(ids);

  res.json(cars);
});

// DELETE request
// This will delete one car
router.delete("/:id", async (req, res) => {
  const data = await carsService.deleteOne(req.params.id);

  if (!data) {
    res.status(404).json({
      message: "Could not find car",
    });
  }

  res.json(data);
});

module.exports = router;
