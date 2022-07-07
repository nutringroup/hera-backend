import { Optional } from 'sequelize';

export interface SquadAttributes {
  id: number;
  name: string;
  status: number;
  idTeamLeader: number;
  idTeamLeaderMonitoring: number;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface SquadCreationAttributes extends Optional<SquadAttributes, 'id'> {}