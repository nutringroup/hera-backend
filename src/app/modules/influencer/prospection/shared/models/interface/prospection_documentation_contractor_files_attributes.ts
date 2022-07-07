import { Optional } from 'sequelize';

export interface ProspectionDocumentationContractorFilesAttributes {
  id: number;
  url: string;
  subtitle: string;
  idDocumentationContractor: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionDocumentationContractorFilesCreationAttributes extends Optional<ProspectionDocumentationContractorFilesAttributes, 'id'> {}