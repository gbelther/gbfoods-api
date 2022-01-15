import "reflect-metadata";
import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "../../../shared/container";
import createConnection from "../../../shared/infra/typeorm";

import { router } from "./routes";
import swaggerFile from "../../../swagger.json";

createConnection();
const app = express();

app.use(express.json());
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

export { app };
