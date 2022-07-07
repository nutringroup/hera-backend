import { Optional } from 'sequelize';

export interface UserTokenAttributes {
  id: number;
  idUser: number;
  token: string;
  cod?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserTokenCreationAttributes extends Optional<UserTokenAttributes, 'id'> {}