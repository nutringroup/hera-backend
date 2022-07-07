import { Optional } from 'sequelize';

export interface AgeGroupAttributes {
  id: number;
  description: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface AgeGroupCreationAttributes extends Optional<AgeGroupAttributes, 'id'> {}