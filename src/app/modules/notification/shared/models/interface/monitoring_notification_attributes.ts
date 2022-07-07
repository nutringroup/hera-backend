import { Optional } from 'sequelize';

export interface MonitoringNotificationAttributes {
  id: number;
  idActionNotification?: number;
  idMonitoring?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
export interface MonitoringNotificationCreationAttributes extends Optional<MonitoringNotificationAttributes, 'id'> {}