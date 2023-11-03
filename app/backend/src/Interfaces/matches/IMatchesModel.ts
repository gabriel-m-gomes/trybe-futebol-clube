import IMatches from './IMatches';

export interface IMatchesModel {
  getAll(): Promise<IMatches[]>
}
