import { DataTypes, Model, Optional } from 'sequelize';

export interface UserAttributes {
  id: number;
  name: string;
  email: string;
  status: number;
  password: string;
  token: string;
  tokenTimeValidation: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}