import { Optional } from 'sequelize';

export interface ProspectionFinancialRequestAttributes {
  id: number;
  confirmTlProspection?: boolean;
  confirmTlMonitoring?: boolean;
  idProspectionFinancial: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionFinancialRequestCreationAttributes extends Optional<ProspectionFinancialRequestAttributes, 'id'> {}