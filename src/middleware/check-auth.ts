import * as jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization!.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY!);
    next();
  } catch {
    res.sendStatus(401);
  }
};
