import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const LeaderBoardControlle = new LeaderBoardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => LeaderBoardControlle.getAll(req, res),
);

export default router;
