import { Request, Response } from "express";
import { TaskModel } from "../../models/task/taskModel";
import { MongooseError } from "mongoose";

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const task = await TaskModel.findOneAndUpdate(
      { _id: id },
      { title, description },
      {
        new: true,
      }
    );
    if (!task) res.status(404).json("Task not found");
    const populatedTask = await TaskModel.findById(task?.id).populate("user");
    res.status(200).json(populatedTask);
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).send(error.message);
    }
  }
};
