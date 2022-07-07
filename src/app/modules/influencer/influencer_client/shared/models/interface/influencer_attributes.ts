import { Optional } from 'sequelize';

export interface InfluencerAttributes {
  id: number;
  name: string;
  instagramName: string;
  idTrackFollowers: number;
  idSegment: number;
  idSegmentSecondary: number;
  idUser: number;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface InfluencerCreationAttributes extends Optional<InfluencerAttributes, 'id'> {}