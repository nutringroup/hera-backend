import { DataTypes, Model } from "sequelize";
import { ProspectionInformationAttributes, ProspectionInformationCreationAttributes } from "./interface/prospection_information_attributes";
import Location from "./location";
import AgeGroup from "./age_group";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionInformation extends Model<ProspectionInformationAttributes, ProspectionInformationCreationAttributes> implements ProspectionInformationAttributes {

    public id!: number;
    public public!: string;
    public audience!: number;
    public cel!: string;
    public idProspection!: number;
    public idLocation!: number;
    public idAge!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionInformation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      public:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      audience:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cel:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      idProspection:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      idLocation:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'location_influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      idAge:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'age_group_influencer', key: 'id' },
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
        tableName: "prospection_information_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

ProspectionInformation.belongsTo(Location, {
  foreignKey: "idLocation",
  as: "location"
});

ProspectionInformation.belongsTo(AgeGroup, {
  foreignKey: "idAge",
  as: "ageGroup"
});

  
export default ProspectionInformation;