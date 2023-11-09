import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoardService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderBoardController {
  constructor(private service = new LeaderBoardService()) {}

  public async getAll(req: Request, res: Response) {
    const { status, data } = await this.service.getAll();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getAllAway(req: Request, res: Response) {
    const { status, data } = await this.service.getAllAway();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
