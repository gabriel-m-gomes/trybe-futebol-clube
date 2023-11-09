import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const LeaderBoardControlle = new LeaderBoardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => LeaderBoardControlle.getAll(req, res),
);

router.get('/away', (req: Request, res: Response) => LeaderBoardControlle.getAllAway(req, res));

export default router;
