import express from "express";
import bodyParser from "body-parser";

import cityRepository from "./repository/cityRepository";
import services from "./services";

const app = express();
const port = process.env.PORT;
const dataSource = {
  repository: null,
};
const service = services(dataSource);

app.use(bodyParser.json());

app.get("/city", async (req, res) => {
  const { lon, lat } = req.query;
  const city = await service.getNearestCity({ longitude: lon, latitude: lat });
  res.send(city);
});
app.post("/city", async (req, res) => {
  console.log(req.body);
  const rowsAdded = await service.validateAndAddCities(req.body);
  res.send(rowsAdded);
});

app.listen(port, () => {
  console.log("Listening at port " + port);
});

cityRepository().then((repo) => {
  console.log("setting repo");
  dataSource.repository = repo;
});
