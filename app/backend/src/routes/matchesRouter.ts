import { Request, Response, Router } from 'express';
import MatchesController from '../controller/MatchesController';

const matcherController = new MatchesController();
const router = Router();

router.get('/', (req: Request, res: Response) => matcherController.getAll(req, res));

export default router;
