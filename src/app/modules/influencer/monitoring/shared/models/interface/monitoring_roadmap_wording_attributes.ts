import { Optional } from 'sequelize';

export interface MonitoringRoadmapWordingAttributes {
  id?: number;
  idRoadmap: number;
  path: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface MonitoringRoadmapWordingCreationAttributes extends Optional<MonitoringRoadmapWordingAttributes, 'id'> {}