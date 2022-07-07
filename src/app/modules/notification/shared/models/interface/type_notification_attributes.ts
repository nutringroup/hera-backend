import { Optional } from 'sequelize';

export interface TypeNotificationAttributes {
  id: number;
  idSector: number;
  idModuleNotification?: number;
  
  createdAt?: Date;
  updatedAt?: Date;
}
export interface TypeNotificationCreationAttributes extends Optional<TypeNotificationAttributes, 'id'> {}