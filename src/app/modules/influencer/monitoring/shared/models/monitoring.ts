import { DataTypes, Model } from "sequelize";
import { MonitoringAttributes, MonitoringCreationAttributes } from "./interface/monitoring_attributes";
import Prospection from "../../../prospection/shared/models/prospection";
import StatusMonitoring from "./status_monitoring";
import MonitoringUserActual from "./monitoring_user_actual";
import MonitoringUserOther from "./monitoring_user_other";
import PublicationMonitoring from "./publication_monitoring";
import PublicationLog from "./publication_log";
import MonitoringRoadmap from "./monitoring_roadmap";
import MonitoringNotification from "../../../../notification/shared/models/monitoring_notification";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class Monitoring extends Model<MonitoringAttributes, MonitoringCreationAttributes> implements MonitoringAttributes {

    public id!: number;
    public idProspection!: number;
    public idStatus!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Monitoring.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idProspection:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      idStatus:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'status_monitoring_influencer', key: 'id' },
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
        tableName: "monitoring_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

Monitoring.belongsTo(Prospection, {
    foreignKey: "idProspection",
    as: "prospection"
});

Monitoring.belongsTo(StatusMonitoring, {
    foreignKey: "idStatus",
    as: "statusMonitoring"
});

Monitoring.hasOne(MonitoringUserActual, {
  foreignKey: "idMonitoring",
  as: "monitoringActual"
});

Monitoring.hasMany(MonitoringUserOther, {
  foreignKey: "idMonitoring",
  as: "monitoringOther"
});

Monitoring.hasMany(PublicationMonitoring, {
  foreignKey: "idMonitoring",
  as: "publicationMonitoring"
});

Monitoring.hasMany(PublicationLog, {
  foreignKey: "idMonitoring",
  as: "publicationLog"
});

Monitoring.hasMany(MonitoringRoadmap, {
  foreignKey: "idMonitoring",
  as: "monitoringRoadmap"
});

Monitoring.hasMany(MonitoringNotification, {
  foreignKey: "idMonitoring",
  as: "idMonitoring"
});

  
export default Monitoring;