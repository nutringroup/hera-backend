import { DataTypes, Model, Optional } from 'sequelize';

export interface UserCodInfluencerAttributes {
  id: number;
  idUser: number;
  cod: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserCodInfluencerCreationAttributes extends Optional<UserCodInfluencerAttributes, 'id'> {}