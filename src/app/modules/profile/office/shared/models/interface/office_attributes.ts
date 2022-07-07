import { Optional } from 'sequelize';

export interface OfficeAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface OfficeCreationAttributes extends Optional<OfficeAttributes, 'id'> {}