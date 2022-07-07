import { BelongsTo, DataTypes, Model } from "sequelize";
import { StatusStepProspectionAttributes, StatusStepProspectionCreationAttributes } from "./interface/status_step_prospection_attributes";
import StatusProspection from "./status_prospection";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class StatusStepProspection extends Model<StatusStepProspectionAttributes, StatusStepProspectionCreationAttributes> implements StatusStepProspectionAttributes {

    public id!: number;
    public idProspection!: number;
    public idStatus!: number;
    public obs!: boolean;
    public comments?: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

StatusStepProspection.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      obs:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      idProspection:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'prospection_influencer', key: 'id' },
        onDelete: 'CASCADE'
      },
      comments:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      idStatus:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'status_prospection_influencer', key: 'id' },
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
      tableName: "prospection_status_step_influencer",
      timestamps: true,
      freezeTableName: true,
      sequelize,
      underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

StatusStepProspection.belongsTo(StatusProspection, {
  foreignKey: "idStatus",
  as: "statusProspection"
});

export default StatusStepProspection;