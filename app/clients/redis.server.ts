import { Redis } from "@upstash/redis";
const { REDIS_URL, REDIS_TOKEN } = process.env;
export const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});
