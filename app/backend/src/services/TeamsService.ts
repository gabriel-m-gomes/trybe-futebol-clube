import { ITeams } from '../Interfaces/teams/ITeams';
import { ServiceResponse } from '../Interfaces/ServiceReponse';
import TeamsModel from '../models/TeamsModel';

export default class TeamsService {
  constructor(private teamModel: TeamsModel = new TeamsModel()) {

  }

  public async getAll(): Promise<ServiceResponse<ITeams[]>> {
    const teams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: teams };
  }
}
