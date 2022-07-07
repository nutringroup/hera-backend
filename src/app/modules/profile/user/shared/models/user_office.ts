import { DataTypes, Model, Sequelize } from "sequelize";
import { UserOfficeAttributes, UserOfficeCreationAttributes } from "./interface/user_office_attributes";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class UserOffice extends Model<UserOfficeAttributes, UserOfficeCreationAttributes> implements UserOfficeAttributes {
    public id!: number
    public name!: string
    public idUser!: number
    public idOfficeSector!: number
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}

UserOffice.init(
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
      idOfficeSector: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'office_sector', key: 'id' },
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
        tableName: "user_office",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
  );
  

  
export default UserOffice;