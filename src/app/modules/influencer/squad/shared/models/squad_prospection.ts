import { DataTypes, Model } from "sequelize";
import { SquadProspectionAttributes, SquadProspectionCreationAttributes } from "./interface/squad_prospection_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class SquadProspection extends Model<SquadProspectionAttributes, SquadProspectionCreationAttributes> implements SquadProspectionAttributes {

    public id!: number
    public idSquad!: number;
    public idUserProspection!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

SquadProspection.init(
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
      idUserProspection:{
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
        tableName: "squad_user_prospection",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default SquadProspection;