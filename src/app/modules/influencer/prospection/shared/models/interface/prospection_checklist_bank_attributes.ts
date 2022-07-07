import { Optional } from 'sequelize';

export interface ProspectionChecklistBankAttributes {
  id: number;
  percentage: number;
  mainName: string;
  cpfCnpj: string;
  bank: number;
  agency: boolean;
  account: string;
  typePix?: string;
  pix?: string;
  receiptBank: boolean;
  urlBank: string;
  idProspection: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionChecklistBankCreationAttributes extends Optional<ProspectionChecklistBankAttributes, 'id'> {}