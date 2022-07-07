import { Optional } from 'sequelize';

export interface ProspectionLogChangeStatusAttributes {
  id: number;
  idProspection: number;
  description: string;
  
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ProspectionLogChangeStatusCreationAttributes extends Optional<ProspectionLogChangeStatusAttributes, 'id'> {}