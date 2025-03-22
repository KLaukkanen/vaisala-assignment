import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import swaggerUI from "swagger-ui-express";
import city from "./routes/city";
import swaggerSpec from "./swagger/weatherApi.json";
import path from "path";
import type { NextFunction, Request, Response } from "express";

const createApp = () => {
  const app = express();

  app.use(express.json());

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  app.use(
    OpenApiValidator.middleware({
      apiSpec: path.join(__dirname, "./swagger/weatherApi.json"),
      validateRequests: {
        coerceTypes: true,
      },
      validateResponses: true,
    })
  );

  app.use("/city", city);

  // All four parameters need to be entered for error handler to work
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if ("status" in err && typeof err.status === "number" && "errors" in err) {
      res
        .status(err.status)
        .json({ message: err.message, errors: err.errors })
        .end();
    } else {
      res.status(500).json({ message: err.message }).end();
    }
  });

  return app;
};

export default createApp;
