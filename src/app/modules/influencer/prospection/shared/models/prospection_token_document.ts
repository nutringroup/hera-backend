import { DataTypes, Model } from "sequelize";
import { ProspectionTokenDocumentAttributes, ProspectionTokenDocumentCreationAttributes } from "./interface/prospection_token_idocument_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionTokenDocument extends Model<ProspectionTokenDocumentAttributes, ProspectionTokenDocumentCreationAttributes> implements ProspectionTokenDocumentAttributes {

    public id!: number;
    public idProspection!: number;
    public token!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionTokenDocument.init(
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
      token:{
        type: DataTypes.TEXT,
        allowNull: false,
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
        tableName: "prospection_token_documenttaion_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default ProspectionTokenDocument;