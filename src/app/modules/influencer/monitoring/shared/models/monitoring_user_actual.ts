import { DataTypes, Model } from "sequelize";
import { MonitoringUserAttributes, MonitoringUserCreationAttributes } from "./interface/monitoring_user_actual_attributes";
import User from "../../../../profile/user/shared/models/user";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class MonitoringUserActual extends Model<MonitoringUserAttributes, MonitoringUserCreationAttributes> implements MonitoringUserAttributes {

    public id!: number;
    public idMonitoring!: number;
    public idUser!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

MonitoringUserActual.init(
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
        tableName: "monitoring_user_actual_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

MonitoringUserActual.belongsTo(User, {
  foreignKey: "idUser",
  as: "user"
});


  
export default MonitoringUserActual;