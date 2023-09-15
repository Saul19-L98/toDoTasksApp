import mongoose from "mongoose";
import moongose, { mongo } from "mongoose";

const userSchema = new moongose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("User", userSchema);

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
