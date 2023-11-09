import { Router } from 'express';
import teamsRouter from './teamsRouter';
import loginRouter from './loginRouter';
import MatchRouter from './matchesRouter';
import leaderBoardRouter from './leaderBoardRouter';

const router = Router();

router.use('/teams', teamsRouter);

router.use('/login', loginRouter);

router.use('/matches', MatchRouter);

router.use('/leaderboard', leaderBoardRouter);
export default router;
