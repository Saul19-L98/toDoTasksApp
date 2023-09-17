import { Request, Response } from "express";
import { TaskModel } from "../../models/task/taskModel";
import { MongooseError } from "mongoose";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, date } = req.body;
    console.log(req.body);
    const newTask = new TaskModel({
      title,
      description,
      date,
      user: req.body.user.id,
    });
    const savedTask = await newTask.save();
    const populatedTask = await TaskModel.findById(savedTask.id).populate(
      "user"
    );
    res.status(200).json(populatedTask);
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).send(error.message);
    }
  }
};
