import { DataTypes, Model } from "sequelize";
import { TypeNotificationAttributes, TypeNotificationCreationAttributes } from "./interface/type_notification_attributes";
import ActionNotification from "./action_notification";
import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class TypeNotification extends Model<TypeNotificationAttributes, TypeNotificationCreationAttributes> implements TypeNotificationAttributes {

    public id!: number;
    public idSector!: number;
    public idModuleNotification!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TypeNotification.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idSector:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'sector', key: 'id' },
        onDelete: 'RESTRICT'
      },
      idModuleNotification:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'module_notification', key: 'id' },
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
        tableName: "type_notification",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

TypeNotification.hasMany(ActionNotification, {
  foreignKey: "idTypeNotification",
  as: "idTypeNotification"
});

  
export default TypeNotification;