import { NextFunction, Request, Response } from 'express';

class ValidateLogin {
  static validateBody(req: Request, res: Response, next: NextFunction): Response | void {
    const user = req.body;
    const regexEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const validEmail = regexEmail.test(user.email);
    const keys = ['email', 'password'];
    const notFoundKey = keys.find((key) => !(key in user) || user[key] === '');

    if (notFoundKey) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (user.password.length < 6 || !validEmail) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }
}

export default ValidateLogin;
