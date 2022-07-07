import { Optional } from 'sequelize';

export interface MonitoringRoadmapAttributes {
  id?: number;
  idMonitoring: number;
  statusRoadmap: number;
  description: string;
  path: string;
  comment?: string;
  isRoadmap: boolean;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface MonitoringRoadmapCreationAttributes extends Optional<MonitoringRoadmapAttributes, 'id'> {}