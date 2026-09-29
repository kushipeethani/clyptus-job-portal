export const authConfig = () => ({ jwtSecret: process.env.JWT_SECRET || "clyptus-secret" });
