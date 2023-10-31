import { Request, Response, Router } from 'express';
import TeamsController from '../controller/TeamsController';

const teamsController = new TeamsController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamsController.getAll(req, res));

export default router;
