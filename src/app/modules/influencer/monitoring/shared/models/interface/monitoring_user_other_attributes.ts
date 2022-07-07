import { Optional } from 'sequelize';

export interface MonitoringUserOtherAttributes {
  id: number;
  idMonitoring: number;
  idUser: number;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface MonitoringUserOtherCreationAttributes extends Optional<MonitoringUserOtherAttributes, 'id'> {}