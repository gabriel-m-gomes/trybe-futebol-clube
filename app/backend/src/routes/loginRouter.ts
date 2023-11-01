import { Request, Response, Router } from 'express';
import UserController from '../controller/UserController';
import ValidateLogin from '../middlewares/validateLogin';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  ValidateLogin.validateBody,
  (req: Request, res: Response) => userController.findByEmail(req, res),
);

export default router;
