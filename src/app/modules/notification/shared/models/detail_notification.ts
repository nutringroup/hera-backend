import { DataTypes, Model } from "sequelize";
import { DetailNotificationAttributes, DetailNotificationCreationAttributes } from "./interface/detail_notification_attributes";
import ActionNotification from "./action_notification";
import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class DetailNotification extends Model<DetailNotificationAttributes, DetailNotificationCreationAttributes> implements DetailNotificationAttributes {

    public id!: number;
    public name!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

DetailNotification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
        tableName: "detail_notification",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

DetailNotification.hasMany(ActionNotification, {
  foreignKey: "idDetailNotification",
  as: "idDetailNotification"
});

export default DetailNotification;