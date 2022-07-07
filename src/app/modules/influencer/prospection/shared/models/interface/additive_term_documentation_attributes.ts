import { Optional } from 'sequelize';

export interface AdditiveTermDocumentationAttributes {
  id: number;
  idAdditiveTerm: number;
  url?: string;
  
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AdditiveTermDocumentationCreationAttributes extends Optional<AdditiveTermDocumentationAttributes, 'id'> {}