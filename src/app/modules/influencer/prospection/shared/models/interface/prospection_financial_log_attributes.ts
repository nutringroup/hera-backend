import { Optional } from 'sequelize';

export interface ProspectionFinancialLogAttributes {
  id: number;
  comment?: boolean;
  idProspectionFinancial: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionFinancialLogCreationAttributes extends Optional<ProspectionFinancialLogAttributes, 'id'> {}