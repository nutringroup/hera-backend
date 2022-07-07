import { Optional } from 'sequelize';

export interface ExclusivityAttributes {
  id: number;
  description: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface ExclusivityCreationAttributes extends Optional<ExclusivityAttributes, 'id'> {}