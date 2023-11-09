import { IHome } from './IHome';

export interface IHomeModel {
  getAll(): Promise<IHome[]>
}
