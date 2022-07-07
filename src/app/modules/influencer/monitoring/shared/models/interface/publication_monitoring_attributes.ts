import { Optional } from 'sequelize';

export interface PublicationMonitoringAttributes {
  id: number;
  datePublication: string;
  link?: string;
  comment?: string;
  color: string;
  isStories: boolean;
  isPhoto: boolean;
  isVideo: boolean;
  isEvaluation: boolean;
  idMonitoring: number;
  idStatusPublication: number;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface PublicationMonitoringCreationAttributes extends Optional<PublicationMonitoringAttributes, 'id'> {}