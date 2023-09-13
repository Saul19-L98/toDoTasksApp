import express from "express";

//create a new express application instance, and assign it to the app variable, which is used to set up the server, and to add new routes, and so on. use the oop paradime to create a new instance of the express application
const app: express.Application = express();
//define the port that the server will listen on
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World! 😅");
});
//start the server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
