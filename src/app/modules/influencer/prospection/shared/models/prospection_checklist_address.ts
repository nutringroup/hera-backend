import { DataTypes, Model } from "sequelize";
import { ProspectionChecklistAddressAttributes, ProspectionChecklistAddressCreationAttributes } from "./interface/prospection_checklist_address_attributes";

import SequelizeConnect  from '../../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionChecklistAddress extends Model<ProspectionChecklistAddressAttributes, ProspectionChecklistAddressCreationAttributes> implements ProspectionChecklistAddressAttributes {

    public id!: number;
    public cep?: string;
    public address?: string;
    public city!: string;
    public district?: string;
    public uf?: string;
    public number?: string;
    public complement?: string;
    public idProspection!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ProspectionChecklistAddress.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        cep:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        address:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        city:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        district:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        uf:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        number:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        complement:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        idProspection:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'prospection_influencer', key: 'id' },
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
        tableName: "prospection_checklist_address_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

  
export default ProspectionChecklistAddress;