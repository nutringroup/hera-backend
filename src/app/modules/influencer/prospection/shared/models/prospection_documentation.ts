import { DataTypes, Model } from "sequelize";
import { ProspectionDocumentationAttributes, ProspectionDocumentationCreationAttributes } from "./interface/prospection_documentation_attributes";
import ProspectionDocumentationContractor from "./prospection_documentation_contractor";
import ProspectionDocumentationIntervening from "./prospection_documentation_intervening";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionDocumentation extends Model<ProspectionDocumentationAttributes, ProspectionDocumentationCreationAttributes> implements ProspectionDocumentationAttributes {

    public id!: number;
    public isUnderage!: boolean;
    public idProspection!: number;
    public token!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionDocumentation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      isUnderage:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      idProspection:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      token:{
        type: DataTypes.TEXT,
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
        tableName: "prospection_documentation",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

ProspectionDocumentation.hasMany(ProspectionDocumentationContractor, {
  foreignKey: "idDocumentation",
  as: "prospectionDocumentationContractor"
});

ProspectionDocumentation.hasMany(ProspectionDocumentationIntervening, {
  foreignKey: "idDocumentation",
  as: "prospectionDocumentationIntervening"
});
  
export default ProspectionDocumentation;