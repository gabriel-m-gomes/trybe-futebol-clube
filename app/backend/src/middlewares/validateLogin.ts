import { NextFunction, Request, Response } from 'express';

class ValidateLogin {
  static validateBody(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const keys = ['email', 'password'];
    const notFoundKey = keys.find((key) => !(key in user) || user[key] === '');
    if (notFoundKey) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    next();
  }
}

export default ValidateLogin;
