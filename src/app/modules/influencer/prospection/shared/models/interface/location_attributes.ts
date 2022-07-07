import { Optional } from 'sequelize';

export interface LocationAttributes {
  id: number;
  initials: string;
  state: string;
  capital: string;
  region: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface LocationCreationAttributes extends Optional<LocationAttributes, 'id'> {}