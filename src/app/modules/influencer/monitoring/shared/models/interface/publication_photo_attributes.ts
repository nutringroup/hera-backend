import { Optional } from 'sequelize';

export interface PublicationPhotoAttributes {
  id: number;
  photo: number;
  dateReceive: string;
  datePost: string;
  idPublication: number;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface PublicationPhotoCreationAttributes extends Optional<PublicationPhotoAttributes, 'id'> {}