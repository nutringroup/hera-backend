import { Optional } from 'sequelize';

export interface MonitoringAttributes {
  id: number;
  idProspection: number;
  idStatus: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface MonitoringCreationAttributes extends Optional<MonitoringAttributes, 'id'> {}