import { DataTypes, Model, Optional } from 'sequelize';

export interface UserOfficeAttributes {
  id: number;
  idUser: number;
  idOfficeSector: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserOfficeCreationAttributes extends Optional<UserOfficeAttributes, 'id'> {}