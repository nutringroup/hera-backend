import { DataTypes, Model } from "sequelize";
import { ProspectionChecklistSocialAttributes, ProspectionChecklistSocialCreationAttributes } from "./interface/prospection_checklist_social_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionChecklistSocial extends Model<ProspectionChecklistSocialAttributes, ProspectionChecklistSocialCreationAttributes> implements ProspectionChecklistSocialAttributes {

    public id!: number;
    public bowlSend!: number;
    public observation!: string;
    public storie!: number;
    public storieValue!: number;
    public photo!: number;
    public photoValue!: number;
    public photoFeed!: number;
    public photoFeedValue!: number;
    public video!: number;
    public videoValue!: number;
    public videoFeed!: number;
    public videoFeedValue!: number;
    public tiktok!: number;
    public tiktokValue!: number;
    public tiktokFeed!: number;
    public tiktokFeedValue!: number;
    public igtv!: number;
    public igtvValue!: number;
    public igtvFeed!: number;
    public igtvFeedValue!: number;
    public live!: number;
    public liveValue!: number;
    public liveSave!: number;
    public liveSaveValue!: number;
    public youtube!: number;
    public youtubeValue!: number;
    public youtubeFeed!: number;
    public youtubeFeedValue!: number;
    public brandExclusive!: number;
    public segmentExclusive!: number;
    public allowBoost!: number;
    public segmentExclusiveValue!: number;
    public commentBoost?: number;
    public valueUseImage!: number;
    public commentChecklist!: string;
    public idProspection!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionChecklistSocial.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
          },
          bowlSend:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          observation:{
            type: DataTypes.STRING,
            allowNull: true,
          },
          storie:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          storieValue:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
          },
          photo:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          photoValue:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
          },
          photoFeed:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          photoFeedValue:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
          },
          video:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          videoValue:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
          },
          videoFeed:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          videoFeedValue:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
          },
          tiktok:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          tiktokValue:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
          },
          tiktokFeed:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          tiktokFeedValue:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
          },
          igtv:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          igtvValue:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
          },
          igtvFeed:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          igtvFeedValue:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
          },
          live:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          liveValue:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
          },
          liveSave:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          liveSaveValue:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
          },
          youtube:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          youtubeValue:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
          },
          youtubeFeed:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          youtubeFeedValue:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
          },
          brandExclusive:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          segmentExclusive:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          allowBoost:{
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          segmentExclusiveValue:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
          },
          commentBoost:{
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          valueUseImage:{
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
          },
          commentChecklist:{
            type: DataTypes.TEXT,
            allowNull: false,
          },
          idProspection:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'prospection_influencer', key: 'id' },
            onDelete: 'CASCADE'
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
        tableName: "prospection_checklist_social_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default ProspectionChecklistSocial;