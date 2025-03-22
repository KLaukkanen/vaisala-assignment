import express from "express";
import { TemperatureUnit } from "../util/temperatureConversions";
import getNearestCity from "../services/getNearestCity";
import addOrUpdateCities from "../services/addOrUpdateCities";

const city = express.Router();

city.get("/", async (req, res, next) => {
  const { lon, lat, tempUnit } = req.query;
  try {
    const city = await getNearestCity(
      {
        longitude: Number(lon),
        latitude: Number(lat),
      },
      (tempUnit || "C") as TemperatureUnit // Openapi validates query
    );
    if (!city) {
      res.status(404).end();
    } else res.json(city);
  } catch (err) {
    next(err);
  }
});

city.post("/", async (req, res, next) => {
  const tempUnit = (req.query.tempUnit || "C") as TemperatureUnit; // Openapi validates query
  try {
    const rowsAdded = await addOrUpdateCities(req.body, tempUnit);
    const status = rowsAdded.rowsCreated > 0 ? 201 : 200;
    res.status(status).json(rowsAdded);
  } catch (err) {
    next(err);
  }
});

export default city;
