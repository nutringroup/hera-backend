import { Optional } from 'sequelize';

export interface ProspectionDocumentationContractorAttributes {
  id: number;
  name: string;
  rg: string;
  cpf: string;
  nacionality: string;
  civilState: string;
  job: string;
  tel?: string;
  email: string;
  isUnderage: boolean;
  idDocumentation: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionDocumentationContractorCreationAttributes extends Optional<ProspectionDocumentationContractorAttributes, 'id'> {}