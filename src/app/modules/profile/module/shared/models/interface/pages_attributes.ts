import { Optional } from 'sequelize';

export interface PagesAttributes {
  id: number;
  name: string;
  url: string;
  icon: string;
  menu: boolean;
  idPai: number;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface PagesCreationAttributes extends Optional<PagesAttributes, 'id'> {}