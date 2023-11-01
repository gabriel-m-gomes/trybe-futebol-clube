import { Request, Response, Router } from 'express';
import ValidateToken from '../middlewares/validateToken';
import UserController from '../controller/UserController';
import ValidateLogin from '../middlewares/validateLogin';

const userController = new UserController();

const router = Router();

router.get(
  '/role',
  ValidateToken.verify,
  (req: Request, res: Response) => userController.getRole(req, res),
);

router.post(
  '/',
  ValidateLogin.validateBody,
  (req: Request, res: Response) => userController.findByEmail(req, res),
);

export default router;
