import { Optional } from 'sequelize';

export interface TypeInfluencerAttributes {
  id: number;
  name: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface TypeInfluencerCreationAttributes extends Optional<TypeInfluencerAttributes, 'id'> {}