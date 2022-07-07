import { Optional } from 'sequelize';

export interface ProspectionChecklistAttributes {
  id: number;
  nickname: string;
  nameFull: string;
  class: string;
  fallowers: number;
  advice: boolean;
  coupon: string;
  birthday: string;
  idProspection: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionChecklistCreationAttributes extends Optional<ProspectionChecklistAttributes, 'id'> {}