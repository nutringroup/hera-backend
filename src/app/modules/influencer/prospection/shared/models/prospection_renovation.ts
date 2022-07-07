import { DataTypes, Model } from "sequelize";
import { ProspectionRenovationAttributes, ProspectionRenovationCreationAttributes } from "./interface/prospection_renovation_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
import StatusRenovation from "./status_renovation_prospection";
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionRenovation extends Model<ProspectionRenovationAttributes, ProspectionRenovationCreationAttributes> implements ProspectionRenovationAttributes {

    public id!: number;
    public idStatusRenovation!: number;
    public idProspection!: number;
    public url!: string;
    public comment!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionRenovation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      url:{
        type: DataTypes.STRING,
        allowNull: false
      },
      comment:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      idStatusRenovation:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'status_renovation_prospection_influencer', key: 'id' },
        onDelete: 'RESTRICT'
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
        tableName: "prospection_renovation_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

ProspectionRenovation.belongsTo(StatusRenovation, {
  foreignKey: "idStatusRenovation",
  as: "statusRenovationProspection"
});

export default ProspectionRenovation;