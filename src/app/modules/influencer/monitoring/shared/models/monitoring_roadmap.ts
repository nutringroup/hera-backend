import { DataTypes, Model } from "sequelize";
import { MonitoringRoadmapAttributes, MonitoringRoadmapCreationAttributes } from "./interface/monitoring_roadmap_attributes";
import StatusRoadMapMonitoring from "./status_roadmap_monitoring";
import MonitoringRoadmapWording from "./monitoring_roadmap_wording";
import MonitoringTokenRoadmap from "./monitoring_token_roadmap";
import MonitoringRoadmapMaterial from "./monitoring_roadmap_material";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class MonitoringRoadmap extends Model<MonitoringRoadmapCreationAttributes, MonitoringRoadmapAttributes> implements MonitoringRoadmapCreationAttributes {

    public id!: number;
    public idMonitoring!: number;
    public statusRoadmap!: number;
    public description!: string;
    public path!: string;
    public comment?: string;
    public isRoadmap!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MonitoringRoadmap.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      description:{
        type: DataTypes.STRING,
        allowNull: false
      },
      path:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      idMonitoring:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'monitoring_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      comment:{
        type: DataTypes.STRING,
        allowNull: true
      },
      isRoadmap:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      statusRoadmap:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'status_roadmap_monitoring_influencer', key: 'id' },
        onDelete: 'RESTRICT'
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
        tableName: "monitoring_roadmap_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

MonitoringRoadmap.belongsTo(StatusRoadMapMonitoring, {
  foreignKey: "statusRoadmap",
  as: "statusRoadmapMonitoring"
});

MonitoringRoadmap.hasMany(MonitoringRoadmapWording, {
  foreignKey: "idRoadmap",
  as: "roadmapWording"
});

MonitoringRoadmap.hasMany(MonitoringRoadmapMaterial, {
  foreignKey: "idRoadmap",
  as: "roadmapMaterial"
});

MonitoringRoadmap.hasMany(MonitoringTokenRoadmap, {
  foreignKey: "idRoadmap",
  as: "tokenRoadmap"
});
  
export default MonitoringRoadmap;