// set-env.ts
import fs from "fs";
import { NODE_API, NODE_API_PORT } from "../config";
// Define the values you want to set
const serverPort = NODE_API_PORT; // Replace with your desired value
const serverUri = NODE_API; // Replace with your desired value

// Create or update the .env file
fs.writeFileSync(
  ".env",
  `VITE_NODE_API=${serverPort}\nVITE_NODE_API_PORT=${serverUri}\n`,
  { flag: "w" }
);

console.log(".env file updated with new values.");
