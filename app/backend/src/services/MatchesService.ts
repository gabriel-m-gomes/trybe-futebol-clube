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

  public async updateMatcher(idMatcher: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this.matchesModel.updateMatcher(idMatcher, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL' };
  }

  public async createMatcher(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const allTeams = await this.matchesModel.getAll();
    const homeTeamExists = allTeams.some((team) => team.homeTeamId === homeTeamId);
    const awayTeamExists = allTeams.some((team) => team.awayTeamId === awayTeamId);
    if (homeTeamExists && awayTeamExists) {
      const data = await this.matchesModel.createMatcher(
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
      );
      return { status: 'CREATED', data };
    }
    return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
  }
}
