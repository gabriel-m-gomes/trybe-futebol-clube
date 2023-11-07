import IMatches from '../Interfaces/matches/IMatches';
import { IMatchesModel } from '../Interfaces/matches/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async getAll(): Promise<IMatches[]> {
    const data = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return data;
  }

  async getAllQuery(query: string): Promise<IMatches[]> {
    const data = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: query === 'true' },
    });

    return data;
  }

  async finishId(idMatcher: number) {
    const matchById = await this.model.update({ inProgress: false }, { where: { id: idMatcher } });
    return matchById;
  }

  async updateMatcher(idMatcher: number, homeTeamGoals: number, awayTeamGoals: number) {
    const matchById = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id: idMatcher } },
    );
    return matchById;
  }

  async createMatcher(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    const inProgress = true;
    const matcher = await this.model.create({
      homeTeamGoals, homeTeamId, awayTeamId, awayTeamGoals, inProgress });
    return matcher.dataValues;
  }
}
