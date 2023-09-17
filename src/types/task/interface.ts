import mongoose from "mongoose";

export interface ITaskData {
  title: string;
  description: string;
  date: string;
  user: {
    id: mongoose.Types.ObjectId;
    iat: number;
    exp: number;
  };
}
