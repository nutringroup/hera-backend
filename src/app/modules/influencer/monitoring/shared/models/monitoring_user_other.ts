import { DataTypes, Model } from "sequelize";
import { MonitoringUserOtherAttributes, MonitoringUserOtherCreationAttributes } from "./interface/monitoring_user_other_attributes";
import User from "../../../../profile/user/shared/models/user";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class MonitoringUserOther extends Model<MonitoringUserOtherAttributes, MonitoringUserOtherCreationAttributes> implements MonitoringUserOtherAttributes {

    public id!: number;
    public idMonitoring!: number;
    public idUser!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MonitoringUserOther.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idMonitoring:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'monitoring_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      idUser:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' },
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
        tableName: "monitoring_user_other_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

MonitoringUserOther.belongsTo(User, {
  foreignKey: "idUser",
  as: "monitoringOther"
});
  
export default MonitoringUserOther;