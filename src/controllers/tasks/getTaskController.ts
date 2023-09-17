import { Request, Response } from "express";
import { TaskModel } from "../../models/task/taskModel";
import { MongooseError } from "mongoose";

export const getTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id);
    if (!task) res.status(404).send("Task not found");
    const populatedTask = await TaskModel.findById(task?.id).populate("user");
    res.status(200).json(populatedTask);
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).send(error.message);
    }
  }
};
