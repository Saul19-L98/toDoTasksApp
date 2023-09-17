import dotenv from "dotenv";

const envFound = dotenv.config();

export const JWT_SECRET = envFound.parsed?.API_JWT_SECRET;
export const MONGO_USER = envFound.parsed?.API_MONGO_USER;
export const MONGO_PASSWORD = envFound.parsed?.API_MONGO_PASSWORD;
