import { DataTypes, Model } from "sequelize";
import { PagesAttributes, PagesCreationAttributes } from "./interface/pages_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class Pages extends Model<PagesAttributes, PagesCreationAttributes> implements PagesAttributes {
    public id!: number
    public name!: string;
    public url!: string;
    public icon!: string;
    public menu!: boolean;
    public idPai!: number;
    public order!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Pages.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      url:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      icon:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      menu:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      idPai:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      order:{
        type: DataTypes.INTEGER,
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
        tableName: "pages",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

  
export default Pages;