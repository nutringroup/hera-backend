import { Optional } from 'sequelize';

export interface ProspectionContractAttributes {
  id: number;
  urlContract: string;
  observation?: string;
  effectiveDate?: string;
  useImageDate?: string;
  idProspection: number;
  isAdditiveTerm?: boolean;
  annexType?: string;
  annexTypeObservation?: string;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionContractCreationAttributes extends Optional<ProspectionContractAttributes, 'id'> {}