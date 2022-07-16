import { Optional } from 'sequelize';

export interface ProspectionFinancialAttributes {
  id: number;
  datePayment: string;
  confirmPayment?: string;
  idProspection: number;
  distraction: boolean;
  valuePayment: number;
  datePaymentReceive?: string;
  datePaymentExpected?: string;
  nfFile?: string;
  paymentProof?: string;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionFinancialContractCreationAttributes extends Optional<ProspectionFinancialAttributes, 'id'> {}