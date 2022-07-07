import { DataTypes, Model } from "sequelize";
import { PublicationLogAttributes, PublicationLogCreationAttributes } from "./interface/publication_log_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class PublicationLog extends Model<PublicationLogAttributes, PublicationLogCreationAttributes> implements PublicationLogAttributes {

    public id!: number;
    public description!: string;
    public comment!: string;
    public idMonitoring!: number;
    public idStatusPublication!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PublicationLog.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      description:{
        type: DataTypes.STRING,
        allowNull: false
      },
      comment:{
        type: DataTypes.TEXT,
        allowNull: false
      },
      idMonitoring:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'monitoring_influencer', key: 'id' },
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
        tableName: "monitoring_publication_log_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);
  
export default PublicationLog;