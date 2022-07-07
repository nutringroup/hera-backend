import { DataTypes, Model } from "sequelize";
import { ProspectionDocumentationContractorAttributes, ProspectionDocumentationContractorCreationAttributes } from "./interface/prospection_documentation_contractor_attributes";
import ProspectionDocumentationContractorFiles from "./prospection_documentation_contractor_files";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionDocumentationContractor extends Model<ProspectionDocumentationContractorAttributes, ProspectionDocumentationContractorCreationAttributes> implements ProspectionDocumentationContractorAttributes {

    public id!: number;
    public name!: string;
    public rg!: string;
    public cpf!: string;
    public nacionality!: string;
    public civilState!: string;
    public job!: string;
    public tel?: string;
    public email!: string;
    public isUnderage!: boolean;
    public idDocumentation!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionDocumentationContractor.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false
      },
      rg:{
        type: DataTypes.STRING,
        allowNull: false
      },
      cpf:{
        type: DataTypes.STRING,
        allowNull: false
      },
      nacionality:{
        type: DataTypes.STRING,
        allowNull: false
      },
      civilState:{
        type: DataTypes.STRING,
        allowNull: true
      },
      job:{
        type: DataTypes.STRING,
        allowNull: true
      },
      tel:{
        type: DataTypes.STRING,
        allowNull: true
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false
      },
      isUnderage:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      idDocumentation:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_documentation', key: 'id' },
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
        tableName: "prospection_documentation_contractor",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

ProspectionDocumentationContractor.hasMany(ProspectionDocumentationContractorFiles, {
  foreignKey: "idDocumentationContractor",
  as: "prospectionDocumentationContractorFiles"
});
  
export default ProspectionDocumentationContractor;