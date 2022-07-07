import { DataTypes, Model, Sequelize } from "sequelize";
import { ProductProspectionAttributes, ProductProspectionCreationAttributes } from "./interface/product_prospection_influencer";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProductProspection extends Model<ProductProspectionAttributes, ProductProspectionCreationAttributes> implements ProductProspectionAttributes {

    public id!: number;
    public idProspection!: number;
    public idProduct!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProductProspection.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idProspection:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      idProduct:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'product_influencer', key: 'id' },
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
        tableName: "product_prospection_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);
  
export default ProductProspection;