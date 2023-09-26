import dotenv from "dotenv";

const envFound = dotenv.config();

export const PORT = envFound.parsed?.API_PORT || process.env.API_PORT;
export const JWT_SECRET =
  envFound.parsed?.API_JWT_SECRET || process.env.API_JWT_SECRET;
export const MONGO_USER =
  envFound.parsed?.API_MONGO_USER || process.env.API_MONGO_USER;
export const MONGO_PASSWORD =
  envFound.parsed?.API_MONGO_PASSWORD || process.env.API_MONGO_PASSWORD;
export const ORIGIN_DOMAIN = `${
  envFound.parsed?.API_ORIGIN_DOMAIN || process.env.API_ORIGIN_DOMAIN
}:${envFound.parsed?.API_ORIGIN_PORT || process.env.API_ORIGIN_PORT}`;

//For the script set-env.ts
export const NODE_API_PORT = envFound.parsed?.API_PORT || process.env.API_PORT;
export const NODE_API =
  envFound.parsed?.API_ORIGIN_DOMAIN || process.env.API_ORIGIN_DOMAIN;
