import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import swaggerUI from "swagger-ui-express";

import cityRepository, { CityRepository } from "./repository/cityRepository";
import services from "./services";
import city from "./routes/city";
import swaggerSpec from "./swagger/weatherApi.json";
import path from "path";
import type { NextFunction, Request, Response } from "express";

export default function createApp(mockRepository?: CityRepository) {
  const app = express();

  const repository = mockRepository || cityRepository;
  const service = services(repository);

  app.use(express.json());

  app.use((req, res, next) => {
    res.set("Content-Type", "Application/json");
    next();
  });
  app.use(
    OpenApiValidator.middleware({
      apiSpec: path.join(__dirname, "./swagger/weatherApi.json"),
      validateRequests: {
        coerceTypes: true,
      },
      validateResponses: true,
    })
  );

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
  app.use("/city", city(service));

  // All four parameters need to be entered for error handler to work
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if ("status" in err && typeof err.status === "number" && "errors" in err) {
      res
        .status(err.status)
        .json({ message: err.message, errors: err.errors })
        .end();
    } else {
      res.status(500).end();
    }
  });

  return app;
}
