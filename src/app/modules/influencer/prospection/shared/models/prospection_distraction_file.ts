import { DataTypes, Model } from "sequelize";
import { ProspectionDistractionFileAttributes, ProspectionDistractionFileCreationAttributes } from "./interface/prospection_distraction_file_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionDistractionFile extends Model<ProspectionDistractionFileAttributes, ProspectionDistractionFileCreationAttributes> implements ProspectionDistractionFileAttributes {

    public id!: number;
    public url!: string;
    public idDistraction!: number;


    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionDistractionFile.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      url:{
        type: DataTypes.STRING,
        allowNull: true
      },
      idDistraction:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_distraction_influencer', key: 'id' },
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
        tableName: "prospection_distraction_file_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);
  
export default ProspectionDistractionFile