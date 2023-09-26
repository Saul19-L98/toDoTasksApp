import app from "./app";
import express from "express";
import path from "path";
import connectionMongoDB from "./db";
import { PORT } from "./config";

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

//define the port that the server will listen on
// const port = PORT;
// app.get("/", (req, res) => {
//   res.status(200).send("Hello World! 😅");
// });
//start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectionMongoDB();
