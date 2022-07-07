import { DataTypes, Model } from "sequelize";
import { ProspectionUserAttributes, ProspectionUserCreationAttributes } from "./interface/prospection_user_actual";
import User from "../../../../profile/user/shared/models/user";

import SequelizeConnect  from '../../../.././../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionUserOther extends Model<ProspectionUserAttributes, ProspectionUserCreationAttributes> implements ProspectionUserAttributes {

    public id!: number;
    public idProspection!: number;
    public idUser!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionUserOther.init(
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
      idUser:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'id' },
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
        tableName: "prospection_user_other_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

ProspectionUserOther.belongsTo(User, {
  foreignKey: "idUser",
  as: "prospectionOther"
});


  
export default ProspectionUserOther;