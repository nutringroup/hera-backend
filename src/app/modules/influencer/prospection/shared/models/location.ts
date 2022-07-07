import { DataTypes, Model, Sequelize } from "sequelize";
import { LocationAttributes, LocationCreationAttributes } from "./interface/location_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class Location extends Model<LocationAttributes, LocationCreationAttributes> implements LocationAttributes {

    public id!: number
    public initials!: string;
    public state!: string;
    public capital!: string;
    public region!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Location.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      initials:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      state:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      region:{
        type: DataTypes.STRING,
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
        tableName: "location_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default Location;