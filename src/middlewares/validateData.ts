import { Request, Response, NextFunction } from "express";
import { ZodError, ZodSchema } from "zod";

export const validateData =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Invalid data",
          errors: error.issues.map((issue) => {
            return {
              field: issue.path.join("."),
              message: issue.message,
            };
          }),
        });
      }
    }
  };
