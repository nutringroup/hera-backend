import { DataTypes, Model } from "sequelize";
import TypeNotification from "../../../../notification/shared/models/type_notification";
import { SectorAttributes, SectorCreationAttributes } from "./interface/sector_attributes";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class Sector extends Model<SectorAttributes, SectorCreationAttributes> implements SectorAttributes {
    public id!: number
    public name!: string
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // public static associations: {
    //     projects: Association<User, Project>;
    // };
}

Sector.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(128),
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
        tableName: "sector",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
        //underscoredAll: true, // passing the `sequelize` instance is required
    }
  );
  
  Sector.hasMany(TypeNotification, {
    foreignKey: "idSector",
    as: "idSector"
  });
  
  
export default Sector;