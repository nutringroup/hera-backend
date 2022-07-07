import { Optional } from 'sequelize';

export interface ReasonAdditiveTermAttributes {
  id: number;
  name: string;
  
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReasonAdditiveTermCreationAttributes extends Optional<ReasonAdditiveTermAttributes, 'id'> {}