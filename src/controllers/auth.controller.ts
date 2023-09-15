import express from "express";
import { UserModel, createUser } from "../models/user.model";

interface IUser {
  email: string;
  password: string;
}

interface IRegisterUser extends IUser {
  username: string;
}

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password }: IRegisterUser = req.body;

    const newUser = new UserModel({
      username,
      email,
      password,
    });
    createUser(newUser);

    res.send("register");
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: "User was not created" });
    }
  }
};

export const login = (req: express.Request, res: express.Response) =>
  res.send("login");
