import { Optional } from 'sequelize';

export interface ProspectionDistractionAttributes {
  id: number;
  urlProspection?: string;
  commentProspection: string;
  urlMonitoring?: string;
  commentMonitoring: string;
  idStatusDistraction: number;
  idProspection: number;
  commentReproved?: string;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionDistractionCreationAttributes extends Optional<ProspectionDistractionAttributes, 'id'> {}