import { DataTypes, Model } from "sequelize";
import { ProspectionChecklistFileAttributes, ProspectionChecklistFileCreationAttributes } from "./interface/prospection_checklist_file_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionChecklistFile extends Model<ProspectionChecklistFileAttributes, ProspectionChecklistFileCreationAttributes> implements ProspectionChecklistFileAttributes {

    public id!: number;
    public idProspection!: number;
    public urlChecklist!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionChecklistFile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      urlChecklist:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      idProspection:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
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
        tableName: "prospection_checklist_file_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default ProspectionChecklistFile;