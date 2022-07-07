import { DataTypes, Model } from "sequelize";
import { StatusAdditiveTermAttributes, StatusAdditiveTermCreationAttributes } from "./interface/status_additive_term_attributes";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
import AdditiveTerm from "./additive_term";
const sequelize = SequelizeConnect.sequelizeConnect;

class StatusAdditiveTerm extends Model<StatusAdditiveTermAttributes, StatusAdditiveTermCreationAttributes> implements StatusAdditiveTermAttributes {

    public id!: number;
    public name!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

StatusAdditiveTerm.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
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
        tableName: "status_additive_term_prospection_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

StatusAdditiveTerm.hasMany(AdditiveTerm, {
  foreignKey: "idStatusAdditiveTerm",
  as: "idStatusAdditiveTerm"
});


export default StatusAdditiveTerm;