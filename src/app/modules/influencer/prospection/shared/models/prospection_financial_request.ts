import { DataTypes, Model } from "sequelize";
import { ProspectionFinancialRequestAttributes, ProspectionFinancialRequestCreationAttributes } from "./interface/prospection_financial_request_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionFinancialRequest extends Model<ProspectionFinancialRequestAttributes, ProspectionFinancialRequestCreationAttributes> implements ProspectionFinancialRequestAttributes {

    public id!: number;
    public idProspectionFinancial!: number;
    public confirmTlProspection?: boolean;
    public confirmTlMonitoring?: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionFinancialRequest.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      confirmTlMonitoring:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      confirmTlProspection:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      idProspectionFinancial:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_financial_influencer', key: 'id' },
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
        tableName: "prospection_financial_request_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default ProspectionFinancialRequest;