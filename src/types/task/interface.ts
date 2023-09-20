import mongoose from "mongoose";

export interface UserId {
  id: mongoose.Types.ObjectId;
  iat: number;
  exp: number;
}
export interface ITaskData {
  title: string;
  description: string;
  date: string;
  user: UserId;
}
