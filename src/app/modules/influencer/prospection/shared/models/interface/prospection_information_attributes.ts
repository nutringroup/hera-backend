import { Optional } from 'sequelize';

export interface ProspectionInformationAttributes {
  id: number;
  public: string;
  audience: number;
  following: number;
  cel: string;
  idProspection: number;
  idLocation: number;
  idAge: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionInformationCreationAttributes extends Optional<ProspectionInformationAttributes, 'id'> {}