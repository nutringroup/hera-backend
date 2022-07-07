import { DataTypes, Model } from "sequelize";
import { ProspectionDocumentationInterveningAttributes, ProspectionDocumentationInterveningCreationAttributes } from "./interface/prospection_documentation_intervening_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionDocumentationIntervening extends Model<ProspectionDocumentationInterveningAttributes, ProspectionDocumentationInterveningCreationAttributes> implements ProspectionDocumentationInterveningAttributes {

    public id!: number;
    public corporateName!: string;
    public email!: string;
    public tel!: string;
    public idDocumentation!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionDocumentationIntervening.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      corporateName:{
        type: DataTypes.STRING,
        allowNull: false
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false
      },
      tel:{
        type: DataTypes.STRING,
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
        tableName: "prospection_documentation_intervening",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);
  
export default ProspectionDocumentationIntervening