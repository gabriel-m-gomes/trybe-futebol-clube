import { ServiceResponse } from '../Interfaces/ServiceReponse';
import { IHome } from '../Interfaces/leaderboard/IHome';
import LeaderBoardModel from '../models/leaderBoardModel';

export default class leaderBoardService {
  constructor(private model = new LeaderBoardModel()) {}

  public async getAll(): Promise<ServiceResponse<IHome[]>> {
    const data = await this.model.getAll();
    return { status: 'SUCCESSFUL', data };
  }
}
