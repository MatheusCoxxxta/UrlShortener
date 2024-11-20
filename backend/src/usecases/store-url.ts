import { logger } from "../external/logger";
import { redisActions } from "../external/redis";
import { generateRandomKey } from "../utils/generateRandomKey";

export const storeUrl = async (url: string) => {
  const key = generateRandomKey(6);

  logger.info(`Storing URL: ${url} with key: ${key}`);

  await redisActions().save(key, {
    url,
    createdAt: new Date(),
  });

  const clientUrl = process.env.CLIENT_URL;

  const completeShortUrl = `${clientUrl}?id=${key}`;

  return completeShortUrl;
};
