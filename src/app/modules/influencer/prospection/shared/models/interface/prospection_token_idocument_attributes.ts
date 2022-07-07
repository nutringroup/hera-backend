import { Optional } from 'sequelize';

export interface ProspectionTokenDocumentAttributes {
  id: number;
  idProspection: number;
  token: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionTokenDocumentCreationAttributes extends Optional<ProspectionTokenDocumentAttributes, 'id'> {}