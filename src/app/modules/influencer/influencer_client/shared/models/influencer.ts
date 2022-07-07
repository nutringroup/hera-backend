import { DataTypes, Model } from "sequelize";
import { InfluencerAttributes, InfluencerCreationAttributes } from "./interface/influencer_attributes";
import TrackFollowers from "./track_followers";
import Segment from "./segment";
import User from "../../../../profile/user/shared/models/user";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class Influencer extends Model<InfluencerAttributes, InfluencerCreationAttributes> implements InfluencerAttributes {

    public id!: number
    public name!: string;
    public instagramName!: string;
    public idTrackFollowers!: number;
    public idSegment!: number;
    public idSegmentSecondary!: number;
    public idUser!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Influencer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      instagramName:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      idTrackFollowers:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'track_followers_influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      idSegment:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'segment_influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      idSegmentSecondary:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'segment_influencer', key: 'id' },
        onDelete: 'RESTRICT'
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
        tableName: "influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

Influencer.belongsTo(TrackFollowers, {
    foreignKey: "idTrackFollowers",
    as: "trackFollowers"
});

Influencer.belongsTo(Segment, {
    foreignKey: "idSegment",
    as: "segment"
});

Influencer.belongsTo(Segment, {
    foreignKey: "idSegmentSecondary",
    as: "segmentSecondary"
});

Influencer.belongsTo(User, {
  foreignKey: "idUser",
  as: "user"
});

  
export default Influencer;