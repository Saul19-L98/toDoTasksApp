import mongoose, { MongooseError } from "mongoose";
import { MONGO_USER, MONGO_PASSWORD } from "./config";

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ymceg3r.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const connectionMongoDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    if (error instanceof MongooseError) {
      console.log("Error with the provided MongoDB URI:", error.message);
    }
  }
};

export default connectionMongoDB;
