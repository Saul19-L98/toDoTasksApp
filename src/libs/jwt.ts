import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { JWT_SECRET } from "../config";

interface IPayload {
  id: ObjectId;
}

export function createAccessToken(payload: IPayload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET!,
      {
        expiresIn: "30d",
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        resolve(token);
      }
    );
  });
}
