import { NextFunction, Request, Response } from 'express';
import { UserPayload } from 'interfaces/user.interface';
import jwt, { Secret } from 'jsonwebtoken';
import config from '../config';

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized',
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      config.jwt.accessTokenSecret as Secret,
    ) as UserPayload;
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(403).json({
      err,
    });
  }
};
