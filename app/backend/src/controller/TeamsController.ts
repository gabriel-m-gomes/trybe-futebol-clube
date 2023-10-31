import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import mapStatusHttp from '../utils/mapStatusHTTP';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAll(_req: Request, res: Response) {
    const { status, data } = await this.teamsService.getAll();
    return res.status(mapStatusHttp(status)).json(data);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamsService.findById(Number(id));
    return res.status(mapStatusHttp(status)).json(data);
  }
}
