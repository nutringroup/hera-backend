import { Optional } from 'sequelize';

export interface AdditiveTermAttributes {
  id: number;
  idProspection: number;
  idReasonAdditiveTerm: number;
  idStatusAdditiveTerm: number;
  description?: string;
  observation?: string;
  urlFileSend: string;
  
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AdditiveTermCreationAttributes extends Optional<AdditiveTermAttributes, 'id'> {}