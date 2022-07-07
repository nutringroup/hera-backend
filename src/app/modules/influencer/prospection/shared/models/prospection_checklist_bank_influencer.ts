import { DataTypes, Model } from "sequelize";
import { ProspectionChecklistBankAttributes, ProspectionChecklistBankCreationAttributes } from "./interface/prospection_checklist_bank_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionChecklistBank extends Model<ProspectionChecklistBankAttributes, ProspectionChecklistBankCreationAttributes> implements ProspectionChecklistBankAttributes {

    public id!: number;
    public percentage!: number;
    public mainName!: string;
    public cpfCnpj!: string;
    public bank!: number;
    public agency!: boolean;
    public account!: string;
    public typePix?: string;
    public pix?: string;
    public receiptBank!: boolean;
    public urlBank!: string;
    public idProspection!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionChecklistBank.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      percentage:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mainName:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpfCnpj:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      bank:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      agency:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      account:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      typePix:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      pix:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      receiptBank:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      urlBank:{
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
        tableName: "prospection_checklist_bank_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default ProspectionChecklistBank;