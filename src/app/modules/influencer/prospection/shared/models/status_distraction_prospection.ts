import { DataTypes, Model } from "sequelize";
import { StatusProspectionAttributes, StatusProspectionCreationAttributes } from "./interface/status_prospection_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class StatusDistractionProspection extends Model<StatusProspectionAttributes, StatusProspectionCreationAttributes> implements StatusProspectionAttributes {

    public id!: number;
    public description!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

StatusDistractionProspection.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      description:{
        type: DataTypes.STRING,
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
        tableName: "status_distraction_prospection_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default StatusDistractionProspection;