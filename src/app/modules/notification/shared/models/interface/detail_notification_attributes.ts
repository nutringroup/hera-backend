import { Optional } from 'sequelize';

export interface DetailNotificationAttributes {
  id: number;
  name: string;

  createdAt?: Date;
  updatedAt?: Date;
}
export interface DetailNotificationCreationAttributes extends Optional<DetailNotificationAttributes, 'id'> {}