import { Optional } from 'sequelize';

export interface ActionNotificationAttributes {
  id: number;
  title: string;
  message: string;
  idUser?: number;
  idTypeNotification: number;
  idDetailNotification: number;

  createdAt?: Date;
  updatedAt?: Date;
}
export interface ActionNotificationCreationAttributes extends Optional<ActionNotificationAttributes, 'id'> {}