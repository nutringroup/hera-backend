import { DataTypes, Model } from "sequelize";
import { UserCodInfluencerAttributes, UserCodInfluencerCreationAttributes } from "./interface/user_cod_influencer_attributes";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class UserCodInfluencer extends Model<UserCodInfluencerAttributes, UserCodInfluencerCreationAttributes> implements UserCodInfluencerAttributes {
    public id!: number
    public idUser!: number
    public cod!: string
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

UserCodInfluencer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' },
        onDelete: 'CASCADE'
      },
      cod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt:{
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt:{
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
        tableName: "user_cod_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
  );
  

  
export default UserCodInfluencer;