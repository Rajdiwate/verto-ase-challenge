import { NextFunction, Request, Response } from 'express';

import { verifyToken, AppError } from '../utils';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (!token) { 
      throw new AppError('Access denied, token missing!', 401);
    }

    const decoded = verifyToken(token);

    // decoded should have id and role
    if (!decoded || !decoded.id) {
      throw new AppError('Access denied, Invalid token!', 401);
    }
    req.id = decoded.id;
    next();
  };
