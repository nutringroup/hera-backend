import { Optional } from 'sequelize';

export interface ProspectionDistractionFileAttributes {
  id: number;
  url: string;
  idDistraction: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionDistractionFileCreationAttributes extends Optional<ProspectionDistractionFileAttributes, 'id'> {}