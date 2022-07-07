import { Optional } from 'sequelize';

export interface ProspectionUserAttributes {
  id: number;
  idProspection: number;
  idUser: number;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionUserCreationAttributes extends Optional<ProspectionUserAttributes, 'id'> {}