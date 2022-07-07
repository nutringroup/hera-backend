import { DataTypes, Model } from "sequelize";
import { ReasonAdditiveTermAttributes, ReasonAdditiveTermCreationAttributes } from "./interface/reason_additive_term_attributes";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
import AdditiveTerm from "./additive_term";
const sequelize = SequelizeConnect.sequelizeConnect;

class ReasonAdditiveTerm extends Model<ReasonAdditiveTermAttributes, ReasonAdditiveTermCreationAttributes> implements ReasonAdditiveTermAttributes {

    public id!: number;
    public name!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ReasonAdditiveTerm.init(
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
        tableName: "reason_additive_term_prospection_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

ReasonAdditiveTerm.hasMany(AdditiveTerm, {
  foreignKey: "idReasonAdditiveTerm",
  as: "idReasonAdditiveTerm"
});


export default ReasonAdditiveTerm;