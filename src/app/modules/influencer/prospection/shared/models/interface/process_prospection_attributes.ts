import { Optional } from 'sequelize';

export interface ProcessProspectionUserAttributes {
  id: number;
  idProspection: number;
  idStatus: number;
  renegotiation: boolean;
  distraction: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProcessProspectionCreationAttributes extends Optional<ProcessProspectionUserAttributes, 'id'> {}