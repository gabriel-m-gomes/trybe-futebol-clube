import { IHome } from '../Interfaces/leaderboard/IHome';
import homeQuery from '../utils/homeQuery';
import { IHomeModel } from '../Interfaces/leaderboard/IHomeModel';
import sequelize from '../database/models';

export default class LeaderBoardModel implements IHomeModel {
  private model = sequelize;

  public async getAll(): Promise<IHome[]> {
    const [datas] = await this.model.query(homeQuery) as IHome[][];
    return datas;
  }
}
