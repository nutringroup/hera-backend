import { Optional } from 'sequelize';

export interface PublicationVideoAttributes {
  id: number;
  video: number;
  dateReceive: string;
  datePost: string;
  isReels: boolean;
  isTiktok: boolean;
  isYoutube: boolean;
  idPublication: number;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface PublicationVideoCreationAttributes extends Optional<PublicationVideoAttributes, 'id'> {}