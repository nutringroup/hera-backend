import { Optional } from 'sequelize';

export interface ModuleOfficeSectorAttributes {
  id: number;
  idModule: number;
  idOfficeSector: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ModuleOfficeSectorCreationAttributes extends Optional<ModuleOfficeSectorAttributes, 'id'> {}