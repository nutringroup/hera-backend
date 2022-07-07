import { DataTypes, Model } from "sequelize";
import { TypeInfluencerAttributes, TypeInfluencerCreationAttributes } from "./interface/type_influencer_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class TypeInfluencer extends Model<TypeInfluencerAttributes, TypeInfluencerCreationAttributes> implements TypeInfluencerAttributes {

    public id!: number
    public name!: string;
    public status!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TypeInfluencer.init(
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
        tableName: "type_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default TypeInfluencer;