import { DataTypes, Model } from "sequelize";
import { SquadAttributes, SquadCreationAttributes } from "./interface/squad_attributes";
import User from "../../../../profile/user/shared/models/user";
import SquadProspection from "./squad_prospection";
import SquadMonitoring from "./squad_monitoring";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class Squad extends Model<SquadAttributes, SquadCreationAttributes> implements SquadAttributes {

    public id!: number
    public name!: string;
    public status!: number;
    public idTeamLeader!: number;
    public idTeamLeaderMonitoring!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Squad.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      status:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      idTeamLeader:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' },
        onDelete: 'CASCADE'
      },
      idTeamLeaderMonitoring:{
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
        tableName: "squad_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

Squad.belongsTo(User, {
    foreignKey: "idTeamLeader",
    as: "userTeamLeader"
});

Squad.belongsTo(User, {
    foreignKey: "idTeamLeaderMonitoring",
    as: "userTeamLeaderMonitoring"
});

Squad.belongsToMany(User, {
    through: SquadProspection, as: "userProspection",
    foreignKey: "idSquad",
    otherKey: 'idUserProspection'
});

Squad.belongsToMany(User, {
    through: SquadMonitoring, as: "userMonitoring",
    foreignKey: "idSquad",
    otherKey: 'idUserMonitoring'
});


  
export default Squad;