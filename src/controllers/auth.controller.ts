import express from "express";
import { UserModel, createUser } from "../models/user.model";
import { hashPassword } from "../helpers";
import { MongooseError } from "mongoose";
import createAccessToken from "../libs/jwt";
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

    const passwordHashed = await hashPassword(password);

    const newUser = new UserModel({
      username,
      email,
      password: passwordHashed,
    });
    createUser(newUser);
    const userResponse = await UserModel.findById(newUser._id).select([
      "username",
      "email",
      "createdAt",
      "updatedAt",
    ]);

    if (!userResponse) {
      return res.status(404).json({ message: "User was not created" });
    }

    const token = await createAccessToken({ id: userResponse._id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    res.status(200).json({
      email: userResponse?.email,
      username: userResponse?.username,
      createdAt: userResponse?.createdAt,
      updatedAt: userResponse?.updatedAt,
    });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: "DataBase connection is not working." });
    }
  }
};

export const login = (req: express.Request, res: express.Response) =>
  res.send("login");
