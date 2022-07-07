import { DataTypes, Model } from "sequelize";
import { UserConfirmEmailAttributes, UserConfirmEmailCreationAttributes } from "./interface/user_confirm_email_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class UserConfirmEmail extends Model<UserConfirmEmailAttributes, UserConfirmEmailCreationAttributes> implements UserConfirmEmailAttributes {
    public id!: number
    public token!: string
    public cod!: string
    public idUser!: number
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

UserConfirmEmail.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      cod: {
        type: DataTypes.STRING(6),
        allowNull: false,
      },
      idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' },
        onDelete: 'CASCADE'
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
        tableName: "user_confirm_email",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
  );
  

  
export default UserConfirmEmail;