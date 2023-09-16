import express from "express";
import { findUserById } from "../../models/user/userModel";

const profileController = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userFound = await findUserById(req.body.id);
    if (!userFound) return res.status(404).json({ message: "User not found" });
    console.log(userFound);
    res.status(200).json({
      id: userFound?._id,
      email: userFound?.email,
      username: userFound?.username,
      createdAt: userFound?.createdAt,
      updatedAt: userFound?.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export default profileController;
