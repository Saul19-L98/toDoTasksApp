import express from "express";
import { UserModel } from "../../models/user/userModel";
import { comparePassword } from "../../helpers/encryption";
import { MongooseError } from "mongoose";
import createAccessToken from "../../libs/jwt";
import { IRegisterUser } from "../../types/user/interfaces";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password }: IRegisterUser = req.body;

    const userFound = await UserModel.findOne({ email });

    if (!userFound) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await comparePassword(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Password is not correct" });
    }

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token, {
      //httpOnly: true,
      secure: true,
      sameSite: "lax",
    });
    res.status(200).json({
      id: userFound?._id,
      email: userFound?.email,
      username: userFound?.username,
      createdAt: userFound?.createdAt,
      updatedAt: userFound?.updatedAt,
    });
  } catch (error) {
    if (error instanceof MongooseError) {
      res.status(500).json({ message: "DataBase connection is not working." });
    }
  }
};
