import { DataTypes, Model } from "sequelize";
import { ProspectionDocumentationContractorFilesAttributes, ProspectionDocumentationContractorFilesCreationAttributes } from "./interface/prospection_documentation_contractor_files_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionDocumentationContractorFiles extends Model<ProspectionDocumentationContractorFilesAttributes, ProspectionDocumentationContractorFilesCreationAttributes> implements ProspectionDocumentationContractorFilesAttributes {

    public id!: number;
    public idDocumentationContractor!: number;
    public url!: string;
    public subtitle!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionDocumentationContractorFiles.init(
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
      subtitle:{
        type: DataTypes.STRING,
        allowNull: false
      },
      idDocumentationContractor:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_documentation_contractor', key: 'id' },
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
        tableName: "prospection_documentation_contractor_files",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);
  
export default ProspectionDocumentationContractorFiles