import { DataTypes, Model } from "sequelize";
import { ProspectionContractAttributes, ProspectionContractCreationAttributes } from "./interface/prospection_contract_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionContract extends Model<ProspectionContractAttributes, ProspectionContractCreationAttributes> implements ProspectionContractAttributes {

    public id!: number;
    public idProspection!: number;
    public effectiveDate?: string;
    public useImageDate?: string;
    public urlContract?: string;
    public observation!: string;
    public isAdditiveTerm!: boolean;
    public annexType?: string;
    public annexTypeObservation?: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionContract.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      urlContract:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      observation:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      effectiveDate:{
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      useImageDate:{
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      idProspection:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      isAdditiveTerm:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      annexType:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      annexTypeObservation:{
        type: DataTypes.STRING,
        allowNull: true,
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
        tableName: "prospection_contract_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default ProspectionContract;