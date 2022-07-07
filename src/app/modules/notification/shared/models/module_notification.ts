import { DataTypes, Model } from "sequelize";
import { ModuleNotificationAttributes, ModuleNotificationCreationAttributes } from "./interface/module_notification_attributes";
import SequelizeConnect  from '../../../../../config/sequelize_request';
import TypeNotification from "./type_notification";
const sequelize = SequelizeConnect.sequelizeConnect;

class ModuleNotification extends Model<ModuleNotificationAttributes, ModuleNotificationCreationAttributes> implements ModuleNotificationAttributes {

    public id!: number;
    public name!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ModuleNotification.init(
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
        tableName: "module_notification",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

ModuleNotification.hasMany(TypeNotification, {
  foreignKey: "idModuleNotification",
  as: "idModuleNotification"
});


  
export default ModuleNotification;