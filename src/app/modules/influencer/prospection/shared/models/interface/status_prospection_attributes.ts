import { Optional } from 'sequelize';

export interface StatusProspectionAttributes {
  id: number;
  description: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface StatusProspectionCreationAttributes extends Optional<StatusProspectionAttributes, 'id'> {}