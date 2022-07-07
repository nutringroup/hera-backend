import { DataTypes, Model } from "sequelize";
import { TrackFollowersAttributes, TrackFollowersCreationAttributes } from "./interface/track_followers_attributes";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class TrackFollowers extends Model<TrackFollowersAttributes, TrackFollowersCreationAttributes> implements TrackFollowersAttributes {

    public id!: number
    public description!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

TrackFollowers.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      description:{
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
        tableName: "track_followers_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default TrackFollowers;