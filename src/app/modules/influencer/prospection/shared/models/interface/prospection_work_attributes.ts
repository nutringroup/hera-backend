import { IntegerDataType, Optional } from 'sequelize';

export interface ProspectionWorkAttributes {
  id: number;
  initialDate: Date;
  finalDate: Date;
  contractPeriod: string;
  mediaAudience: number;
  value: number;
  mediaValue: number;
  job: string;
  comments?: string;
  additionalImageUse: boolean;
  additionalPeriod?: number;
  additionalPeriodValue?: number;
  idProspection: number;
  idType: number;
  idExclusivity: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionWorkCreationAttributes extends Optional<ProspectionWorkAttributes, 'id'> {}