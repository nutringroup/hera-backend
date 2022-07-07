import { Optional } from 'sequelize';

export interface ProspectionAttributes {
  id: number;
  cod: string;
  idInfluencer: number;
  idSquad: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionCreationAttributes extends Optional<ProspectionAttributes, 'id'> {}