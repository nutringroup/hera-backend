import { DataTypes, Model } from "sequelize";
import { UserTokenAttributes, UserTokenCreationAttributes } from "./interface/user_token_attributes";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class UserTokenLogin extends Model<UserTokenAttributes, UserTokenCreationAttributes> implements UserTokenAttributes {
    public id!: number
    public token!: string
    public cod?: string
    public idUser!: number
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

UserTokenLogin.init(
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
      token: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      cod: {
        type: DataTypes.STRING,
        allowNull: true
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
        tableName: "user_token_login",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
  );
  

  
export default UserTokenLogin;