import { DataTypes, Model } from "sequelize";
import { ModuleOfficeSectorAttributes, ModuleOfficeSectorCreationAttributes } from "./interface/module_office_sector_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ModuleOfficeSector extends Model<ModuleOfficeSectorAttributes, ModuleOfficeSectorCreationAttributes> implements ModuleOfficeSectorAttributes {
    public id!: number
    public idModule!: number
    public idOfficeSector!: number

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ModuleOfficeSector.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idModule:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'module', key: 'id' },
        onDelete: 'CASCADE'
      },
      idOfficeSector:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'office_sector', key: 'id' },
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
        tableName: "module_office_sector",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);
  
export default ModuleOfficeSector;