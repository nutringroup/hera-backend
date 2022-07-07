import { Optional } from 'sequelize';

export interface TrackFollowersAttributes {
  id: number;
  description: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface TrackFollowersCreationAttributes extends Optional<TrackFollowersAttributes, 'id'> {}