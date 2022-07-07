import { DataTypes, Model } from "sequelize";
import { PublicationStoriesAttributes, PublicationStoriesCreationAttributes } from "./interface/publication_stories_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class PublicationStories extends Model<PublicationStoriesAttributes, PublicationStoriesCreationAttributes> implements PublicationStoriesAttributes {

    public id!: number;
    public sequence!: number;
    public link?: string;
    public idPublication!: number; 

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PublicationStories.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      sequence:{
        type: DataTypes.STRING,
        allowNull: false
      },
      link:{
        type: DataTypes.STRING,
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
        tableName: "monitoring_publication_stories_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default PublicationStories;