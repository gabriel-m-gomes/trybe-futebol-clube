import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import mapStatusHttp from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAll(_req: Request, res: Response) {
    const { status, data } = await this.teamsService.getAll();
    console.log(status);
    return res.status(mapStatusHttp(status)).json(data);
  }
}
