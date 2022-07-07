import { Optional } from 'sequelize';

export interface StatusMonitoringAttributes {
  id: number;
  description: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface StatusMonitoringCreationAttributes extends Optional<StatusMonitoringAttributes, 'id'> {}