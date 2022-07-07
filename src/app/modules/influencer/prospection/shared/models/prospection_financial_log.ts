import { DataTypes, Model } from "sequelize";
import { ProspectionFinancialLogAttributes, ProspectionFinancialLogCreationAttributes } from "./interface/prospection_financial_log_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionFinancialLog extends Model<ProspectionFinancialLogAttributes, ProspectionFinancialLogCreationAttributes> implements ProspectionFinancialLogAttributes {

    public id!: number;
    public idProspectionFinancial!: number;
    public comment?: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionFinancialLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      comment:{
        type: DataTypes.TEXT,
        allowNull: false,
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
        tableName: "prospection_financial_log_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default ProspectionFinancialLog;