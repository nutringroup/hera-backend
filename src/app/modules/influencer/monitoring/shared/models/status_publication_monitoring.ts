import { DataTypes, Model } from "sequelize";
import { StatusMonitoringAttributes, StatusMonitoringCreationAttributes } from "./interface/status_monitoring_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class StatusPublicationMonitoring extends Model<StatusMonitoringAttributes, StatusMonitoringCreationAttributes> implements StatusMonitoringAttributes {

    public id!: number;
    public description!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

StatusPublicationMonitoring.init(
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
        tableName: "status_publication_monitoring_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default StatusPublicationMonitoring;