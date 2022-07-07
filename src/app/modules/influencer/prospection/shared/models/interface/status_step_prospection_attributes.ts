import { Optional } from 'sequelize';

export interface StatusStepProspectionAttributes {
  id: number;
  idProspection: number;
  idStatus: number;
  obs: boolean;
  comments?: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface StatusStepProspectionCreationAttributes extends Optional<StatusStepProspectionAttributes, 'id'> {}