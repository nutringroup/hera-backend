import { Optional } from 'sequelize';

export interface PublicationLogAttributes {
  id: number;
  idMonitoring: number;
  description: string;
  comment: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface PublicationLogCreationAttributes extends Optional<PublicationLogAttributes, 'id'> {}