import { Optional } from 'sequelize';

export interface ProspectionChecklistAddressAttributes {
  id: number;
  cep?: string;
  address?: string;
  city: string;
  district?: string;
  uf?: string;
  number?: string;
  complement?: string;
  idProspection: number;

  updatedAt?: Date;
  createdAt?: Date;
}
export interface ProspectionChecklistAddressCreationAttributes extends Optional<ProspectionChecklistAddressAttributes, 'id'> {}