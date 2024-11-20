import express from "express";
import { storeUrl } from "./usecases/store-url";
import { retrieveUrl } from "./usecases/retrieve-url";
import { logger } from "./external/logger";

const router = express.Router();

router.get("/alive", (request, response) => {
  response.json({
    alive: true,
    at: new Date().toLocaleString(),
  });
});

router.post("/", async (request, response) => {
  const body = request.body;
  logger.info(body);

  const shortUrl = await storeUrl(body.url);

  response.send(shortUrl);
});

router.get("/:key", async (request, response) => {
  const { key } = request.params;

  try {
    const completeUrl = await retrieveUrl(key);

    if (!completeUrl) {
      response.status(404).json();
    }

    response.json(completeUrl);
  } catch (error) {}
});

export default router;
