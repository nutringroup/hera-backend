import { Optional } from 'sequelize';

export interface OfficeSectorAttributes {
  id: number;
  idOffice: number;
  idSector: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface OfficeSectorCreationAttributes extends Optional<OfficeSectorAttributes, 'id'> {}