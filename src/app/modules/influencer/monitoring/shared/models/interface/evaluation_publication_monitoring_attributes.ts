import { Optional } from 'sequelize';

export interface EvaluationPublicationAttributes {
  id: number;
  idPublication: number;
  idStatusEvaluation: number;
  comment?: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface EvaluationPublicationCreationAttributes extends Optional<EvaluationPublicationAttributes, 'id'> {}