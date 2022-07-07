import { Optional } from 'sequelize';

export interface MonitoringUserAttributes {
  id: number;
  idMonitoring: number;
  idUser: number;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface MonitoringUserCreationAttributes extends Optional<MonitoringUserAttributes, 'id'> {}