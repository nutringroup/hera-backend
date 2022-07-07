import { DataTypes, Model } from "sequelize";
import { AdditiveTermDocumentationAttributes, AdditiveTermDocumentationCreationAttributes } from "./interface/additive_term_documentation_attributes";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class AdditiveTermDocumentation extends Model<AdditiveTermDocumentationAttributes, AdditiveTermDocumentationCreationAttributes> implements AdditiveTermDocumentationAttributes {

    public id!: number;
    public idAdditiveTerm!: number;
    public url!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AdditiveTermDocumentation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idAdditiveTerm:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'additive_term_prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      url:{
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
        tableName: "additive_term_documentation_prospection_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

export default AdditiveTermDocumentation;