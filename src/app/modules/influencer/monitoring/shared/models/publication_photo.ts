import { DataTypes, Model } from "sequelize";
import { PublicationPhotoAttributes, PublicationPhotoCreationAttributes } from "./interface/publication_photo_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class PublicationPhoto extends Model<PublicationPhotoAttributes, PublicationPhotoCreationAttributes> implements PublicationPhotoAttributes {

    public id!: number;
    public photo!: number;
    public dateReceive!: string;
    public datePost!: string;
    public idPublication!: number; 

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PublicationPhoto.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      photo:{
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
        tableName: "monitoring_publication_photo_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default PublicationPhoto;