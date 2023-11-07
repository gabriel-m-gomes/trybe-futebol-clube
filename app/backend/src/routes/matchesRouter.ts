import { Request, Response, Router } from 'express';
import ValidateToken from '../middlewares/validateToken';
import ValidateMatcher from '../middlewares/validateMatcher';
import MatchesController from '../controller/MatchesController';

const matcherController = new MatchesController();
const router = Router();

router.get('/', (req: Request, res: Response) => matcherController.getAll(req, res));

router.patch(
  '/:id/finish',
  ValidateToken.verify,
  (req: Request, res: Response) => matcherController.finishId(req, res),
);

router.patch(
  '/:id',
  ValidateToken.verify,
  (req: Request, res: Response) => matcherController.updateMatcher(req, res),
);

router.post(
  '/',
  ValidateToken.verify,
  ValidateMatcher.validateBody,
  (req: Request, res: Response) => matcherController.createMatcher(req, res),
);
export default router;
