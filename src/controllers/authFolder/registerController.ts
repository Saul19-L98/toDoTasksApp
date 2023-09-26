import express from "express";
import { UserModel, createUser } from "../../models/user/userModel";
import { hashPassword } from "../../helpers/encryption";
import { MongooseError } from "mongoose";
import { createAccessToken } from "../../libs/jwt";
import { IRegisterUser } from "../../types/user/interfaces";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { username, email, password }: IRegisterUser = req.body;

    const passwordHashed = await hashPassword(password);

    const newUser = new UserModel({
      username,
      email,
      password: passwordHashed,
    });
    const userAlreadyExist = await UserModel.findOne({ email });

    if (userAlreadyExist) {
      return res.status(404).json({ message: "User already exist" });
    }
    const userSaved = await createUser(newUser);
    const userResponse = await UserModel.findById({
      _id: userSaved._id,
    }).select(["username", "email", "createdAt", "updatedAt"]);

    if (!userResponse) {
      return res.status(404).json({ message: "User was not created" });
    }

    const token = await createAccessToken({ id: userResponse._id });
    res.cookie("token", token, {
      //httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    res.status(200).json({
      id: userResponse?._id,
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
