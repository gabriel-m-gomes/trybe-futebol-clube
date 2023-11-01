import * as bcrypt from 'bcryptjs';
import JwtService from '../utils/jwt';
import { ITOKEN } from '../Interfaces/token/ITOKEN';
import { ServiceResponse } from '../Interfaces/ServiceReponse';
import UsersModel from '../models/UsersModel';

export default class UserService {
  constructor(private userModel = new UsersModel()) {}

  public async findByEmail(email: string, password: string): Promise<ServiceResponse<ITOKEN>> {
    const user = await this.userModel.findByEmail(email);
    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    const PasswordValid = await bcrypt.compare(password, user.password);

    if (!PasswordValid) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const token = JwtService.sign({ id: user.id, email: user.email });

    return { status: 'SUCCESSFUL', data: { token } };
  }
}
