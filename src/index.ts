import app from "./app";
import connectionMongoDB from "./db";
import { PORT } from "./config";

//define the port that the server will listen on
const port = PORT;
app.get("/", (req, res) => {
  res.status(200).send("Hello World! 😅");
});
//start the server
app.listen(port);

connectionMongoDB();
