import { Optional } from 'sequelize';

export interface ProductAttributes {
  id: number;
  name: string;
  status: number;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}