import { DataTypes, Model } from "sequelize";
import { ProcessProspectionUserAttributes, ProcessProspectionCreationAttributes } from "./interface/process_prospection_attributes";
import ProspectionRenegotiation from "./prospection_renegotiation";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProcessProspection extends Model<ProcessProspectionUserAttributes, ProcessProspectionCreationAttributes> implements ProcessProspectionUserAttributes {

    public id!: number;
    public idProspection!: number;
    public idStatus!: number;
    public renegotiation!: boolean;
    public distraction!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProcessProspection.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idProspection:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      idStatus:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'status_prospection_influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      renegotiation:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      distraction:{
        type: DataTypes.BOOLEAN,
        allowNull: false
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
        tableName: "process_prospection_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

ProcessProspection.hasMany(ProspectionRenegotiation, {
  foreignKey: "idProcessProspection",
  as: "prospectionRenegotiation"
});

export default ProcessProspection;