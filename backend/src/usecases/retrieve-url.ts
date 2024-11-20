import { logger } from "../external/logger";
import { redisActions } from "../external/redis";

export const retrieveUrl = async (key: string) => {
  logger.info(`Looking for URL for key: ${key}`);

  const url = await redisActions().retrieve(key);

  return url;
};
