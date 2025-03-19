import express from "express";
import bodyParser from "body-parser";

import cityRepository from "./repository/cityRepository";
import services from "./services";

export default async function startApp(mockRepository) {
  const app = express();
  const port = process.env.PORT;

  const repository = mockRepository || (await cityRepository());
  const service = services(repository);

  app.use(bodyParser.json());

  app.get("/city", async (req, res) => {
    const { lon, lat } = req.query;
    const city = await service.getNearestCity({
      longitude: lon,
      latitude: lat,
    });

    res.send(city);
  });
  app.post("/city", async (req, res) => {
    console.log(req.body);
    const rowsAdded = await service.validateAndAddCities(req.body);
    res.status(200).send(`Rows added: ${rowsAdded}`).end();
  });

  const server = app.listen(port);

  console.log("Listening at port " + port);

  return {
    app,
    shutdown: () => {
      server.close();
      repository?.close();
    },
  };
}
