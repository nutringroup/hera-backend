import { DataTypes, Model } from "sequelize";
import { ProspectionChecklistAttributes, ProspectionChecklistCreationAttributes } from "./interface/prospection_checklist_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionChecklist extends Model<ProspectionChecklistAttributes, ProspectionChecklistCreationAttributes> implements ProspectionChecklistAttributes {

    public id!: number;
    public nickname!: string;
    public nameFull!: string;
    public class!: string;
    public fallowers!: number;
    public advice!: boolean;
    public coupon!: string;
    public birthday!: string;
    public idProspection!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionChecklist.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nickname:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      nameFull:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      class:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      fallowers:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      advice:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      coupon:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday:{
        type: DataTypes.DATE,
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
        tableName: "prospection_checklist_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default ProspectionChecklist;