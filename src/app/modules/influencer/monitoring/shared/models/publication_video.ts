import { DataTypes, Model } from "sequelize";
import { PublicationVideoAttributes, PublicationVideoCreationAttributes } from "./interface/publication_video_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class PublicationVideo extends Model<PublicationVideoAttributes, PublicationVideoCreationAttributes> implements PublicationVideoAttributes {

    public id!: number;
    public video!: number;
    public dateReceive!: string;
    public datePost!: string;
    public isReels!: boolean;
    public isTiktok!: boolean;
    public isYoutube!: boolean;
    public idPublication!: number; 

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PublicationVideo.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      video:{
        type: DataTypes.STRING,
        allowNull: false
      },
      dateReceive:{
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      datePost:{
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      isReels:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      isTiktok:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      isYoutube:{
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      idPublication:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'monitoring_publication_influencer', key: 'id' },
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
        tableName: "monitoring_publication_video_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default PublicationVideo;