import { DataTypes, Model } from "sequelize";
import { PublicationMonitoringAttributes, PublicationMonitoringCreationAttributes } from "./interface/publication_monitoring_attributes";
import StatusPublicationMonitoring from "./status_publication_monitoring";
import EvaluationPublicationMonitoring from "./evaluation_publication_monitoring";
import PublicationStories from "./publication_stories";
import PublicationPhoto from "./publication_photo";
import PublicationVideo from "./publication_video";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class PublicationMonitoring extends Model<PublicationMonitoringAttributes, PublicationMonitoringCreationAttributes> implements PublicationMonitoringAttributes {

    public id!: number;
    public datePublication!: string;
    public link?: string;
    public comment?: string;
    public color!: string;
    public isStories!: boolean;
    public isPhoto!: boolean;
    public isVideo!: boolean;
    public isEvaluation!: boolean;
    public idMonitoring!: number;
    public idStatusPublication!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PublicationMonitoring.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      datePublication:{
        type: DataTypes.DATE,
        allowNull: false
      },
      link:{
        type: DataTypes.STRING,
        allowNull: true
      },
      comment:{
        type: DataTypes.TEXT,
        allowNull: true
      },
      color:{
        type: DataTypes.STRING,
        allowNull: false
      },
      isStories:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      isPhoto:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      isVideo:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      isEvaluation:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      idMonitoring:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'monitoring_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      idStatusPublication:{  
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'status_publication_monitoring_influencer', key: 'id' },
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
        tableName: "monitoring_publication_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

PublicationMonitoring.belongsTo(StatusPublicationMonitoring, {
  foreignKey: "idStatusPublication",
  as: "statusPublication"
});

PublicationMonitoring.hasOne(EvaluationPublicationMonitoring, {
  foreignKey: "idPublication",
  as: "evaluationPublication"
});

PublicationMonitoring.hasOne(PublicationStories, {
  foreignKey: "idPublication",
  as: "publicationStories"
});

PublicationMonitoring.hasOne(PublicationPhoto, {
  foreignKey: "idPublication",
  as: "publicationPhoto"
});

PublicationMonitoring.hasOne(PublicationVideo, {
  foreignKey: "idPublication",
  as: "publicationVideo"
});
  
export default PublicationMonitoring;