export const redisConfig = () => ({ host: process.env.REDIS_HOST || "localhost", port: 6379 });
