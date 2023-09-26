import express from "express";

export const logout = async (_: express.Request, res: express.Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout successfully" });
};
