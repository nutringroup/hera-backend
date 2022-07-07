import { DataTypes, Model } from "sequelize";
import { ProspectionDistractionAttributes, ProspectionDistractionCreationAttributes } from "./interface/prospection_distraction_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
import StatusDistractionProspection from "./status_distraction_prospection";
import ProspectionDistractionFile from "./prospection_distraction_file";
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionDistraction extends Model<ProspectionDistractionAttributes, ProspectionDistractionCreationAttributes> implements ProspectionDistractionAttributes {

    public id!: number;
    public urlMonitoring?: string;
    public commentMonitoring!: string;
    public urlProspection?: string;
    public commentProspection!: string;
    public idStatusDistraction!: number;
    public idProspection!: number;
    public commentReproved?: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionDistraction.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      urlMonitoring:{
        type: DataTypes.STRING,
        allowNull: true
      },
      commentMonitoring:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      urlProspection:{
        type: DataTypes.STRING,
        allowNull: true
      },
      commentProspection:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      idStatusDistraction:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'status_distraction_prospection_influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      idProspection:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      commentReproved:{
        type: DataTypes.TEXT,
        allowNull: true
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
        tableName: "prospection_distraction_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

ProspectionDistraction.belongsTo(StatusDistractionProspection, {
    foreignKey: "idStatusDistraction",
    as: "statusDistractionProspection"
  });

ProspectionDistraction.hasOne(ProspectionDistractionFile, {
  foreignKey: "idDistraction",
  as: "prospectionDistractionFile"
});
  
export default ProspectionDistraction