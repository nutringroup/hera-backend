import { DataTypes, Model } from "sequelize";
import { UserAttributes, UserCreationAttributes } from "./interface/user_attributes";
import bcrypt from 'bcryptjs';
import UserOffice from "./user_office";
import UserConfirmEmail from "./user_confirm_email";
import OfficeSector from "../../../office/shared/models/office_sector";
import ActionNotification from "../../../../notification/shared/models/action_notification";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
import UserTokenLogin from "./user_token_login";
const sequelize = SequelizeConnect.sequelizeConnect;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number
    public name!: string
    public email!: string
    public status!: number
    public password!: string
    public token!: string
    public tokenTimeValidation!: string
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    passwordVerify(password: string){
      return bcrypt.compare(password, this.password);
    }

    async cryptPassword(password: string){
      return await bcrypt.hash(password, 8); 
    }
  
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      tokenTimeValidation: {
        type: DataTypes.TEXT,
        allowNull: false
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
        tableName: "user",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
  );

  // ******** ASSOCIAÇÕES DAS TABELAS ********
  
User.belongsToMany(OfficeSector, {
    through: UserOffice, as: "userOffice",
    foreignKey: "idUser",
    otherKey: 'idOfficeSector'
});

User.hasOne(UserConfirmEmail, {
  foreignKey: "idUser",
  as: "userConfirmEmail"
});

User.hasMany(ActionNotification, {
  foreignKey: "idUser",
  as: "idUser"
});

User.hasMany(UserTokenLogin, {
  foreignKey: "idUser",
  as: "userTokenLogin"
});


  
export default User;