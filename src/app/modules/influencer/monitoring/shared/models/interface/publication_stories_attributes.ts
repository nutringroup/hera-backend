import { Optional } from 'sequelize';

export interface PublicationStoriesAttributes {
  id: number;
  sequence: number;
  link?: string;
  idPublication: number;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface PublicationStoriesCreationAttributes extends Optional<PublicationStoriesAttributes, 'id'> {}