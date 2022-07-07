import { Optional } from 'sequelize';

export interface ProspectionChecklistFileAttributes {
  id: number;
  urlChecklist: string;
  idProspection: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionChecklistFileCreationAttributes extends Optional<ProspectionChecklistFileAttributes, 'id'> {}