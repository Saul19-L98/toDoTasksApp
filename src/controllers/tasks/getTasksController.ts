import { Request, Response } from "express";
import { TaskModel } from "../../models/task/taskModel";
import { MongooseError } from "mongoose";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await TaskModel.find({
      user: req.body.user.id,
    }).populate("user");
    if (!tasks) res.status(404).json({ message: "There are no tasks" });
    res.status(200).json(tasks);
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).send(error.message);
    }
  }
};
