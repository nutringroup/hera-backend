import { DataTypes, Model, Optional } from 'sequelize';

export interface UserConfirmEmailAttributes {
  id: number;
  token: string;
  cod: string;
  idUser: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserConfirmEmailCreationAttributes extends Optional<UserConfirmEmailAttributes, 'id'> {}