import { DataTypes, Model } from "sequelize";
import { ModulePagesAttributes, ModulePagesCreationAttributes } from "./interface/module_pages_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ModulePages extends Model<ModulePagesAttributes, ModulePagesCreationAttributes> implements ModulePagesAttributes {
    public id!: number
    public idModule!: number
    public idPages!: number

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ModulePages.init(
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
      idPages:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'pages', key: 'id' },
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
        tableName: "module_pages",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

  
export default ModulePages;