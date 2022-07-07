import { DataTypes, Model } from "sequelize";
import { ProspectionWorkAttributes, ProspectionWorkCreationAttributes } from "./interface/prospection_work_attributes";
import TypeInfluencer from "../../../type_influencer/shared/models/type_influencer";
import Exclusivity from "./exclusivity";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionWork extends Model<ProspectionWorkAttributes, ProspectionWorkCreationAttributes> implements ProspectionWorkAttributes {

    public id!: number;
    public initialDate!: Date;
    public finalDate!: Date;
    public contractPeriod!: string;
    public mediaAudience!: number;
    public value!: number;
    public mediaValue!: number;
    public job!: string;
    public comments?: string;
    public additionalImageUse!: boolean;
    public additionalPeriod?: number;
    public additionalPeriodValue?: number;
    public idProspection!: number;
    public idType!: number;
    public idExclusivity!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionWork.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      initialDate:{
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      finalDate:{
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      contractPeriod:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mediaAudience:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
      value:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
      mediaValue:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
      job:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      comments:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      additionalImageUse:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      additionalPeriod:{
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      additionalPeriodValue:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      idProspection:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      idType:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'type_influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      idExclusivity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'exclusivity_influencer', key: 'id' },
        onDelete: 'RESTRICT'
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
        tableName: "prospection_work_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

ProspectionWork.belongsTo(TypeInfluencer, {
  foreignKey: "idType",
  as: "typeInfluencer"
});

ProspectionWork.belongsTo(Exclusivity, {
  foreignKey: "idExclusivity",
  as: "exclusivity"
});

  
export default ProspectionWork;