import { DataTypes, Model, Optional } from 'sequelize';

export interface SectorAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface SectorCreationAttributes extends Optional<SectorAttributes, 'id'> {}