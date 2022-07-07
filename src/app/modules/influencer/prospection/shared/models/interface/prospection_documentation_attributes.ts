import { Optional } from 'sequelize';

export interface ProspectionDocumentationAttributes {
  id: number;
  isUnderage: boolean;
  idProspection: number;
  token: string;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionDocumentationCreationAttributes extends Optional<ProspectionDocumentationAttributes, 'id'> {}