import { DataTypes, Model } from "sequelize";
import { ProspectionLogChangeStatusAttributes, ProspectionLogChangeStatusCreationAttributes } from "./interface/prospection_log_change_status_influencer_attributes";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionLogChangeStatus extends Model<ProspectionLogChangeStatusAttributes, ProspectionLogChangeStatusCreationAttributes> implements ProspectionLogChangeStatusAttributes {

    public id!: number;
    public idProspection!: number;
    public description!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionLogChangeStatus.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idProspection:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
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
        tableName: "prospection_log_change_status_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);


export default ProspectionLogChangeStatus;