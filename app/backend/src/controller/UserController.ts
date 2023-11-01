import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHttp from '../utils/mapStatusHTTP';

export default class UserController {
  constructor(private userService = new UserService(), private role: string = '') {}

  public async findByEmail(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.userService.findByEmail(email, password);
    return res.status(mapStatusHttp(status)).json(data);
  }

  public async getRole(req: Request, res: Response) {
    const data = res.locals;
    const { role } = data;
    this.role = role;
    return res.status(mapStatusHttp('SUCCESSFUL')).json({ role: this.role });
  }
}
