import { DataTypes, Model } from "sequelize";
import { ActionNotificationAttributes, ActionNotificationCreationAttributes } from "./interface/action_notification_attributes";
import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;
import ProspectionNotification from "./prospection_notification";
import MonitoringNotification from "./monitoring_notification";


class ActionNotification extends Model<ActionNotificationAttributes, ActionNotificationCreationAttributes> implements ActionNotificationAttributes {

    public id!: number;
    public title!: string;
    public message!: string;
    public idUser?: number;
    public idTypeNotification!: number;
    public idDetailNotification!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ActionNotification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idUser:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'user', key: 'id' },
        onDelete: 'RESTRICT'
      },
      idTypeNotification:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'type_notification', key: 'id' },
        onDelete: 'RESTRICT'
      },
      idDetailNotification:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'detail_notification', key: 'id' },
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
        tableName: "action_notification",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

ActionNotification.hasMany(ProspectionNotification, {
  foreignKey: "idActionNotification",
   as: "actionNotification",
});

ActionNotification.hasMany(MonitoringNotification, {
  foreignKey: "idActionNotification",
   as: "idActionNotification",
});
  
export default ActionNotification;