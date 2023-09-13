import express from "express";
import morgan from "morgan";

//create a new express application instance, and assign it to the app variable, which is used to set up the server, and to add new routes, and so on. use the oop paradime to create a new instance of the express application
const app: express.Application = express();
app.use(morgan("dev"));
export default app;
