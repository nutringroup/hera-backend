import { Optional } from 'sequelize';

export interface ModuleNotificationAttributes {
  id: number;
  name: string;

  createdAt?: Date;
  updatedAt?: Date;
}
export interface ModuleNotificationCreationAttributes extends Optional<ModuleNotificationAttributes, 'id'> {}