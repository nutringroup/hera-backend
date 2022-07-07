import { Optional } from 'sequelize';

export interface ProspectionDocumentationInterveningFilesAttributes {
  id: number;
  url: string;
  subtitle: string;
  idDocumentationIntervening: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionDocumentationInterveningFilesCreationAttributes extends Optional<ProspectionDocumentationInterveningFilesAttributes, 'id'> {}