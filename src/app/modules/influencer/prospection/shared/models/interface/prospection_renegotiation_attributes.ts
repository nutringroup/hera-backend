import { Optional } from 'sequelize';

export interface ProspectionRenegotiationAttributes {
  id: number;
  idProcessProspection: number;
  idProspection: number;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionRenegotiationCreationAttributes extends Optional<ProspectionRenegotiationAttributes, 'id'> {}