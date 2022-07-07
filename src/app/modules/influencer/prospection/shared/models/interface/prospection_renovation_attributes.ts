import { Optional } from 'sequelize';

export interface ProspectionRenovationAttributes {
  id: number;
  idStatusRenovation: number;
  idProspection: number;
  url: string;
  comment: string;
    
  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionRenovationCreationAttributes extends Optional<ProspectionRenovationAttributes, 'id'> {}