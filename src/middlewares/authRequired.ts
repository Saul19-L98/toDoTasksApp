import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const authRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.cookies.token;
  if (!token)
    return res.status(401).json({ message: "You are not authorized" });
  jwt.verify(token, JWT_SECRET!, (error, decoded) => {
    if (error) return res.status(401).json({ message: "Invalid token" });
    req.body = { ...req.body, user: decoded };
    next();
  });
};
