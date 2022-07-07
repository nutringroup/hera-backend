import { DataTypes, Model } from "sequelize";
import { ProspectionDocumentationInterveningFilesAttributes, ProspectionDocumentationInterveningFilesCreationAttributes } from "./interface/prospection_documentation_intervening_files_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionDocumentationInterveningFiles extends Model<ProspectionDocumentationInterveningFilesAttributes, ProspectionDocumentationInterveningFilesCreationAttributes> implements ProspectionDocumentationInterveningFilesAttributes {

    public id!: number;
    public idDocumentationIntervening!: number;
    public url!: string;
    public subtitle!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionDocumentationInterveningFiles.init(
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
      idDocumentationIntervening:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_documentation_intervening', key: 'id' },
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
        tableName: "prospection_documentation_intervening_files",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);
  
export default ProspectionDocumentationInterveningFiles