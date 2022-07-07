import { DataTypes, Model } from "sequelize";
import { AdditiveTermAttributes, AdditiveTermCreationAttributes } from "./interface/additive_term_attributes";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
import AdditiveTermDocumentation from "./additive_term_documentation";
const sequelize = SequelizeConnect.sequelizeConnect;

class AdditiveTerm extends Model<AdditiveTermAttributes, AdditiveTermCreationAttributes> implements AdditiveTermAttributes {

    public id!: number;
    public idProspection!: number;
    public idReasonAdditiveTerm!: number;
    public idStatusAdditiveTerm!: number;
    public description!: string;
    public observation!: string;
    public urlFileSend!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AdditiveTerm.init(
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
      idReasonAdditiveTerm:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'reason_additive_term_prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      idStatusAdditiveTerm:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'status_additive_term_prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      description:{
        type: DataTypes.STRING,
        allowNull: true
      },
      observation:{
        type: DataTypes.STRING,
        allowNull: true
      },
      urlFileSend:{
        type: DataTypes.STRING,
        allowNull: true
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
        tableName: "additive_term_prospection_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

AdditiveTerm.hasMany(AdditiveTermDocumentation, {
  foreignKey: "idAdditiveTerm",
  as: "idAdditiveTerm"
});

export default AdditiveTerm;