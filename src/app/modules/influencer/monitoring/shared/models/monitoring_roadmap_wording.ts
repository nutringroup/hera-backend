import { DataTypes, Model } from "sequelize";
import { MonitoringRoadmapWordingAttributes, MonitoringRoadmapWordingCreationAttributes } from "./interface/monitoring_roadmap_wording_attributes";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class MonitoringRoadmapWording extends Model<MonitoringRoadmapWordingAttributes, MonitoringRoadmapWordingCreationAttributes> implements MonitoringRoadmapWordingAttributes {

    public id!: number;
    public idRoadmap!: number;
    public path!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MonitoringRoadmapWording.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      path:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      idRoadmap:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'monitoring_roadmap_influencer', key: 'id' },
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
        tableName: "monitoring_roadmap_wording_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);
  
export default MonitoringRoadmapWording;