import Redis from "ioredis";
import { logger } from "./logger";
const pass = process.env.REDIS_PASS;
const port = process.env.REDIS_PORT;
const host = process.env.REDIS_HOST as string;

let ioRedisClient: Redis;

const RedisConnect = async () => {
  const url = `redis://:${pass}@${host}:${port}`;
  ioRedisClient = new Redis(url);

  logger.info("Redis client started...");
};

const save = async (key: string, value: object) => {
  const stringValue = JSON.stringify(value);

  await ioRedisClient.set(key, stringValue);
};

const retrieve = async (key: string) => {
  const value = await ioRedisClient.get(key);

  if (!value) {
    return null;
  }

  const jsonValue: { url: string; createdAt: Date } = JSON.parse(value);
  return jsonValue;
};

export const redisActions = () => {
  return {
    save,
    retrieve,
  };
};

export default RedisConnect();
