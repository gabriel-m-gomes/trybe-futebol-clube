import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHttp from '../utils/mapStatusHTTP';

export default class MatchesController {
  constructor(
    private matchService = new MatchesService(),
  ) { }

  public async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      const { status, data } = await this.matchService.getAllQuery(inProgress as string);
      return res.status(mapStatusHttp(status)).json(data);
    }
    const { status, data } = await this.matchService.getAll();

    return res.status(mapStatusHttp(status)).json(data);
  }

  public async finishId(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = await this.matchService.finishId(Number(id));
    return res.status(mapStatusHttp(status)).json({ message: 'Finished' });
  }
}
