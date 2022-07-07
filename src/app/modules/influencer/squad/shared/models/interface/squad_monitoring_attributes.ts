import { Optional } from 'sequelize';

export interface SquadMonitoringAttributes {
  id: number;
  idSquad: number;
  idUserMonitoring: number;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface SquadMonitoringCreationAttributes extends Optional<SquadMonitoringAttributes, 'id'> {}