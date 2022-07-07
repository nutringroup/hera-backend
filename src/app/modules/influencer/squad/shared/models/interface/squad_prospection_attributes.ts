import { Optional } from 'sequelize';

export interface SquadProspectionAttributes {
  id: number;
  idSquad: number;
  idUserProspection: number;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface SquadProspectionCreationAttributes extends Optional<SquadProspectionAttributes, 'id'> {}