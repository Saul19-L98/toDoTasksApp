import app from "./app";

//define the port that the server will listen on
const port = 3000;
app.get("/", (req, res) => {
  res.send("Hello World! 😅");
});
//start the server
app.listen(port, () => {
  //console.log(`server started at http://localhost:${port}`);
});
