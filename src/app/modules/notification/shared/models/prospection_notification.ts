import { DataTypes, Model } from "sequelize";
import { ProspectionNotificationAttributes, ProspectionNotificationCreationAttributes } from "./interface/prospection_notification_attributes";
import SequelizeConnect from "../../../../../config/sequelize_request";
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionNotification extends Model<ProspectionNotificationAttributes, ProspectionNotificationCreationAttributes> implements ProspectionNotificationAttributes {

    public id!: number;
    public idActionNotification!: number;
    public idProspection!: number;
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionNotification.init(
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
      idProspection:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
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
        tableName: "prospection_notification",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);
  
export default ProspectionNotification;