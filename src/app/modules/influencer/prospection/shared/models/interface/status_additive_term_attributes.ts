import { Optional } from 'sequelize';

export interface StatusAdditiveTermAttributes {
  id: number;
  name: string;
  
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StatusAdditiveTermCreationAttributes extends Optional<StatusAdditiveTermAttributes, 'id'> {}