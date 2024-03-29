import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHttp from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchService = new MatchesService(),
  ) { }

  public async getAll(req: Request, res: Response):Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress) {
      const { status, data } = await this.matchService.getAllQuery(inProgress as string);
      return res.status(mapStatusHttp(status)).json(data);
    }
    const { status, data } = await this.matchService.getAll();

    return res.status(mapStatusHttp(status)).json(data);
  }

  public async finishId(req: Request, res: Response):Promise<Response> {
    const { id } = req.params;
    const { status } = await this.matchService.finishId(Number(id));
    return res.status(mapStatusHttp(status)).json({ message: 'Finished' });
  }

  public async updateMatcher(req: Request, res: Response):Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { status } = await this.matchService.updateMatcher(
      Number(id),
      homeTeamGoals,
      awayTeamGoals,
    );
    return res.status(mapStatusHttp(status)).json('UPDATE!');
  }

  public async createMatcher(req: Request, res: Response): Promise<Response> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const { status, data } = await this.matchService.createMatcher(
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    );
    return res.status(mapStatusHttp(status)).json(data);
  }
}
