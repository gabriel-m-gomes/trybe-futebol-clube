import { Model, QueryInterface, DataTypes } from 'sequelize';
import IMatches from '../../Interfaces/matches/IMatches';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IMatches>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
     homeTeamGoals: {
        type: DataTypes.INTEGER,
        field: 'home_team_goals',
      },
     homeTeamId: {
        type: DataTypes.INTEGER,
        field: 'home_team_id',
      },
     awayTeamId: {
        type: DataTypes.INTEGER,
        field: 'away_team_id',
      },
     awayTeamGoals: {
        type: DataTypes.INTEGER,
        field: 'away_team_goals',
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        field: 'in_progress',
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};