import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import config from "../config";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({
    message: 'Access Denied',
  });

  try {
      const decoded = jwt.verify(token, config.jwt.accessTokenSecret as Secret);
      next();
  } catch (err) {
    return res.status(400).json({
      message: 'Invalid Token',
    });
  }
}