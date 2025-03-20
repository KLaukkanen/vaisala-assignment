import express from "express";
import type { Service } from "../services";
import { TemperatureUnit } from "../util/temperatureConversions";

const createCityRouter = (service: Service) => {
  const city = express.Router();

  city.get("/", async (req, res, next) => {
    const { lon, lat, tempUnit } = req.query;
    try {
      const city = await service.getNearestCity(
        {
          longitude: Number(lon),
          latitude: Number(lat),
        },
        (tempUnit || "C") as TemperatureUnit // Openapi validates query
      );

      res.json(city);
    } catch (err) {
      next(err);
    }
  });

  city.post("/", async (req, res, next) => {
    const tempUnit = (req.query.tempUnit || "C") as TemperatureUnit; // Openapi validates query
    try {
      const rowsAdded = await service.validateAndAddCities(req.body, tempUnit);
      const status = rowsAdded.rowsCreated > 0 ? 201 : 200;
      res.status(status).json(rowsAdded);
    } catch (err) {
      next(err);
    }
  });

  return city;
};
export default createCityRouter;
