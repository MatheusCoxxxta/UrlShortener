import "dotenv/config";
import express from "express";
import router from "./src/router";
import cors from "cors";

import "./src/external/redis";
import { logger } from "./src/external/logger";

const api = express();

api.use(express.json());
api.use(cors());

api.use("/url", router);

api.listen(process.env.PORT, () =>
  logger.info(`API listening on PORT: ${process.env.PORT}`)
);
