import { DataTypes, Model } from "sequelize";
import { ProspectionRenegotiationAttributes, ProspectionRenegotiationCreationAttributes } from "./interface/prospection_renegotiation_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionRenegotiation extends Model<ProspectionRenegotiationAttributes, ProspectionRenegotiationCreationAttributes> implements ProspectionRenegotiationAttributes {

    public id!: number;
    public idProcessProspection!: number;
    public idProspection!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionRenegotiation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idProcessProspection:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'process_prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      idProspection:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
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
        tableName: "prospection_renegotiation",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

export default ProspectionRenegotiation;