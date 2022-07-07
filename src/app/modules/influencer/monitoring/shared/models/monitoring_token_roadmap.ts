import { DataTypes, Model } from "sequelize";
import { MonitoringTokenRoadmapAttributes, MonitoringTokenRoadmapCreationAttributes } from "./interface/monitoring_token_roadmap_attributes";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class MonitoringTokenRoadmap extends Model<MonitoringTokenRoadmapAttributes, MonitoringTokenRoadmapCreationAttributes> implements MonitoringTokenRoadmapAttributes {

    public id!: number;
    public idRoadmap!: number;
    public token!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MonitoringTokenRoadmap.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      token:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      idRoadmap:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'monitoring_roadmap_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      createdAt:{
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt:{
        type: DataTypes.DATE,
        allowNull: false,
      }
    },
    {
        tableName: "monitoring_token_roadmap_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);
  
export default MonitoringTokenRoadmap;