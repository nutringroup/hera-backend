import { Optional } from 'sequelize';

export interface ModuleAttributes {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ModuleCreationAttributes extends Optional<ModuleAttributes, 'id'> {}