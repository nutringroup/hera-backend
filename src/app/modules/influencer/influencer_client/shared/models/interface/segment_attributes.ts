import { Optional } from 'sequelize';

export interface SegmentAttributes {
  id: number;
  name: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface SegmentCreationAttributes extends Optional<SegmentAttributes, 'id'> {}