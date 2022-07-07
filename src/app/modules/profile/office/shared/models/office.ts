import { DataTypes, Model } from "sequelize";
import { OfficeAttributes, OfficeCreationAttributes } from "./interface/office_attributes";
import OfficeSector from "./office_sector";
import Sector from "../../../sector/shared/models/sector";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class Office extends Model<OfficeAttributes, OfficeCreationAttributes> implements OfficeAttributes {
    public id!: number
    public name!: string
    public idSector!: number

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Office.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
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
        tableName: "office",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

Office.belongsToMany(Sector, {
  through: OfficeSector, as: "officeSector",
  foreignKey: "idOffice",
  otherKey: 'idSector'
});

  
export default Office;