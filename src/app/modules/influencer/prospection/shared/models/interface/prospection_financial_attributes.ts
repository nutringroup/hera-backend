import { Optional } from 'sequelize';

export interface ProspectionFinancialAttributes {
  id: number;
  datePayment: string;
  confirmPayment?: string;
  idProspection: number;
  distraction: boolean;
  valuePayment: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionFinancialContractCreationAttributes extends Optional<ProspectionFinancialAttributes, 'id'> {}