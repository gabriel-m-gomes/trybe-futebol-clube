import { IUsers } from '../Interfaces/users/IUsers';
import SequelizeUsers from '../database/models/SequelizeUsers';
import { IUsersModel } from '../Interfaces/users/IUserModel';

export default class UsersModel implements IUsersModel {
  private model = SequelizeUsers;

  async findByEmail(email: string): Promise<IUsers | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    return user;
  }
}
