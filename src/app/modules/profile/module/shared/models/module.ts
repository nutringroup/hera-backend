import { DataTypes, Model } from "sequelize";
import { ModuleAttributes, ModuleCreationAttributes } from "./interface/module_attributes";
import ModuleOfficeSector from "./module_office_sector";
import OfficeSector from "../../../office/shared/models/office_sector";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class Module extends Model<ModuleAttributes, ModuleCreationAttributes> implements ModuleAttributes {
    public id!: number
    public name!: string
    public idSector!: number

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Module.init(
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
        tableName: "module",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

Module.belongsToMany(OfficeSector, {
  through: ModuleOfficeSector, as: "moduleOfficeSector",
  foreignKey: "idModule",
  otherKey: 'idOfficeSectorr'
});

// Module.hasMany(Pages, {
//   foreignKey: "idModule",
//   as: "pages"
// });

  
export default Module;