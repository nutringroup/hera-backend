import { Optional } from 'sequelize';

export interface ProspectionDocumentationInterveningAttributes {
  id: number;
  corporateName: string;
  email: string;
  tel: string;
  idDocumentation: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionDocumentationInterveningCreationAttributes extends Optional<ProspectionDocumentationInterveningAttributes, 'id'> {}