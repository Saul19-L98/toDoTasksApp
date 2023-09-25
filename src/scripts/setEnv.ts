// set-env.ts
import fs from "fs";
import path from "path";
import { NODE_API, NODE_API_PORT } from "../config";
import { config } from "dotenv";

// Define the values you want to set
const serverPort = NODE_API_PORT; // Replace with your desired value
const serverUri = NODE_API; // Replace with your desired value

// Define the path to the .env file inside the client folder
console.log(__dirname);
const envFilePath = path.join(__dirname, "../../client/.env");

// Create or update the .env file using dotenv config function
config({ path: envFilePath });

// Create or update the .env file
fs.writeFileSync(
  envFilePath,
  `VITE_NODE_API="${serverUri}"\nVITE_NODE_API_PORT="${serverPort}"\n`,
  { flag: "w" }
);

console.log(".env file updated with new values.");
