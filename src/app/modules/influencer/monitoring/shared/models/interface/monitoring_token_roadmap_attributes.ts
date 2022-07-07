import { Optional } from 'sequelize';

export interface MonitoringTokenRoadmapAttributes {
  id?: number;
  idRoadmap: number;
  token: string;
  updatedAt?: Date;
  createdAt?: Date;
}
export interface MonitoringTokenRoadmapCreationAttributes extends Optional<MonitoringTokenRoadmapAttributes, 'id'> {}