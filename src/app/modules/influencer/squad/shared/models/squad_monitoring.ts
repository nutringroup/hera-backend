import { DataTypes, Model } from "sequelize";
import { SquadMonitoringAttributes, SquadMonitoringCreationAttributes } from "./interface/squad_monitoring_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class SquadMonitoring extends Model<SquadMonitoringAttributes, SquadMonitoringCreationAttributes> implements SquadMonitoringAttributes {

    public id!: number
    public idSquad!: number;
    public idUserMonitoring!: number;
    public idPages!: number

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

SquadMonitoring.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idSquad:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'squad_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      idUserMonitoring:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' },
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
        tableName: "squad_user_monitoring",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

  
export default SquadMonitoring;