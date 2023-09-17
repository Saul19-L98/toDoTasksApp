import { Request, Response } from "express";
import { TaskModel } from "../../models/task/taskModel";
import { MongooseError } from "mongoose";

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findByIdAndDelete(id);
    if (!task) res.status(404).json("Task not found");
    res.sendStatus(204).json({ message: "Task deleted" });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).send(error.message);
    }
  }
};
