import { DataTypes, Model } from "sequelize";
import { ProspectionFinancialAttributes, ProspectionFinancialContractCreationAttributes } from "./interface/prospection_financial_attributes";
import ProspectionFinancialRequest from "./prospection_financial_request";
import ProspectionFinancialLog from "./prospection_financial_log";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionFinancial extends Model<ProspectionFinancialAttributes, ProspectionFinancialContractCreationAttributes> implements ProspectionFinancialAttributes {

    public id!: number;
    public idProspection!: number;
    public datePayment!: string;
    public confirmPayment?: string;
    public distraction!: boolean;
    public valuePayment!: number;
    public datePaymentReceive?: string;
    public datePaymentExpected?: string;
    public nfFIle?: string;
    public paymentProof?: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionFinancial.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      datePayment:{
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      confirmPayment:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      distraction:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      valuePayment:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
      datePaymentReceive:{
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      datePaymentExpected:{
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      nfFile:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      paymentProof:{
        type: DataTypes.STRING,
        allowNull: true,
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
        tableName: "prospection_financial_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

ProspectionFinancial.hasOne(ProspectionFinancialRequest, {
  foreignKey: "idProspectionFinancial",
  as: "prospectionFinancialRequest"
});

ProspectionFinancial.hasMany(ProspectionFinancialLog, {
  foreignKey: "idProspectionFinancial",
  as: "prospectionFinancialLog"
});


  
export default ProspectionFinancial;