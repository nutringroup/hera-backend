import { DataTypes, Model } from "sequelize";
import { OfficeSectorAttributes, OfficeSectorCreationAttributes } from "./interface/office_sector_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class OfficeSector extends Model<OfficeSectorAttributes, OfficeSectorCreationAttributes> implements OfficeSectorAttributes {
    public id!: number
    public idOffice!: number
    public idSector!: number

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

OfficeSector.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      idOffice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'office', key: 'id' },
        onDelete: 'CASCADE'
      },
      idSector: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'sector', key: 'id' },
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
        tableName: "office_sector",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default OfficeSector;