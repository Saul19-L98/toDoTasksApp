import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/user/userModel";
import { JWT_SECRET } from "../../config";
import mongoose from "mongoose";
import { UserId } from "../../types/task/interface";

export const verifyToken = async (req: Request, res: Response) => {
  const { token }: { token: string } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });
  jwt.verify(
    token,
    JWT_SECRET!,
    async (error: jwt.VerifyErrors | null, decoded: any) => {
      if (error) res.status(401).json({ message: "Token is not valid" });
      const user = decoded as UserId;
      const userFound = await UserModel.findById(
        user?.id as mongoose.Types.ObjectId
      );
      if (!userFound) res.status(401).json({ message: "Token is not valid" });
      res.status(200).json({
        id: userFound?._id,
        username: userFound?.username,
        email: userFound?.email,
        updatedAt: userFound?.updatedAt,
        createdAt: userFound?.createdAt,
      });
    }
  );
};
