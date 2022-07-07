import { Optional } from 'sequelize';

export interface ProductProspectionAttributes {
  id: number;
  idProspection: number;
  idProduct: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProductProspectionCreationAttributes extends Optional<ProductProspectionAttributes, 'id'> {}