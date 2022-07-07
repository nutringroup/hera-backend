import { DataTypes, Model } from "sequelize";
import { EvaluationPublicationAttributes, EvaluationPublicationCreationAttributes } from "./interface/evaluation_publication_monitoring_attributes";
import StatusEvaluationMonitoring from "./status_publication_evaluation";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class EvaluationPublicationMonitoring extends Model<EvaluationPublicationAttributes, EvaluationPublicationCreationAttributes> implements EvaluationPublicationAttributes {

    public id!: number;
    public idPublication!: number;
    public idStatusEvaluation!: number;
    public comment?: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

EvaluationPublicationMonitoring.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idPublication:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'monitoring_publication_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      idStatusEvaluation:{  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'status_evaluation_monitoring_influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      comment:{  
        type: DataTypes.TEXT,
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
        tableName: "monitoring_publication_evaluation_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

EvaluationPublicationMonitoring.belongsTo(StatusEvaluationMonitoring, {
  foreignKey: "idStatusEvaluation",
  as: "statusEvaluation"
});
  
export default EvaluationPublicationMonitoring;