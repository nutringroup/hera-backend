import { Optional } from 'sequelize';

export interface ProspectionNotificationAttributes {
  id: number;
  idActionNotification?: number;
  idProspection?: number;

  createdAt?: Date;
  updatedAt?: Date;
}
export interface ProspectionNotificationCreationAttributes extends Optional<ProspectionNotificationAttributes, 'id'> {}