import MatchesModel from '../models/MatchesModel';
import { ServiceResponse } from '../Interfaces/ServiceReponse';
import IMatches from '../Interfaces/matches/IMatches';

export default class MatchesService {
  constructor(private matchesModel: MatchesModel = new MatchesModel()) {}

  public async getAll(): Promise<ServiceResponse<IMatches[]>> {
    const all = await this.matchesModel.getAll();
    return { status: 'SUCCESSFUL', data: all };
  }

  public async getAllQuery(param: string): Promise<ServiceResponse<IMatches[]>> {
    const all = await this.matchesModel.getAllQuery(param);
    return { status: 'SUCCESSFUL', data: all };
  }

  public async finishId(idMatches: number) {
    await this.matchesModel.finishId(idMatches);
    return { status: 'SUCCESSFUL' };
  }
}
