import { DataTypes, Model } from "sequelize";
import { MonitoringNotificationAttributes, MonitoringNotificationCreationAttributes } from "./interface/monitoring_notification_attributes";
import SequelizeConnect from "../../../../../config/sequelize_request";
const sequelize = SequelizeConnect.sequelizeConnect;

class MonitoringNotification extends Model<MonitoringNotificationAttributes, MonitoringNotificationCreationAttributes> implements MonitoringNotificationAttributes {

    public id!: number;
    public idActionNotification!: number;
    public idMonitoring!: number;
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MonitoringNotification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idActionNotification:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'action_notification', key: 'id' },
        onDelete: 'CASCADE'
      },
      idMonitoring:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'monitoring_influencer', key: 'id' },
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
        tableName: "monitoring_notification",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);
  
export default MonitoringNotification;