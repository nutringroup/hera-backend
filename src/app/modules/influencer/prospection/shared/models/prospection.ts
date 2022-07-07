import { DataTypes, Model } from "sequelize";
import { ProspectionAttributes, ProspectionCreationAttributes } from "./interface/prospection_attributes";
import Product from "../../../product/shared/models/product";
import Influencer from "../../../influencer_client/shared/models/influencer";
import Squad from "../../../squad/shared/models/squad";
import ProspectionUserActual from "./prospection_user_actual";
import ProspectionUserOther from "./prospection_user_other";
import ProcessProspection from "./process_prospection";
import ProspectionInformation from "./prospection_information";
import ProspectionWork from "./prospection_work";
import StatusStepProspection from "./status_step_prospection";
import StatusProspection from "./status_prospection";
import ProductProspection from "./product_prospection";
import ProspectionChecklist from "./prospection_checklist";
import ProspectionChecklistAddress from "./prospection_checklist_address";
import ProspectionChecklistSocial from "./prospection_checklist_social";
import ProspectionTokenDocument from "./prospection_token_document";
import ProspectionChecklistBank from "./prospection_checklist_bank_influencer";
import ProspectionContract from "./prospection_contract_influencer";
import ProspectionFinancial from "./prospection_financial";
import ProspectionChecklistFile from "./prospection_checklist_file";
import ProspectionDocumentation from "./prospection_documentation";
import ProspectionRenegotiation from "./prospection_renegotiation";
import ProspectionNotification from "../../../../notification/shared/models/prospection_notification";
import SequelizeConnect  from '../../../../../../config/sequelize_request';
import ProspectionDistraction from "./prospection_distraction";
import ProspectionRenovation from "./prospection_renovation";
import AdditiveTerm from "./additive_term";
import ProspectionLogChangeStatus from "./prospection_log_change_status_influencer";
const sequelize = SequelizeConnect.sequelizeConnect;

class Prospection extends Model<ProspectionAttributes, ProspectionCreationAttributes> implements ProspectionAttributes {

    public id!: number;
    public cod!: string;
    public idInfluencer!: number;
    public idSquad!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Prospection.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      cod:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      idInfluencer:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'influencer', key: 'id' },
        onDelete: 'RESTRICT'
      },
      idSquad:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'squad_influencer', key: 'id' },
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
        tableName: "prospection_influencer",
        timestamps: true,
        freezeTableName: true,
        sequelize,
        underscored: true
    }
);

// ******** ASSOCIAÇÕES DAS TABELAS ********

Prospection.belongsTo(Influencer, {
    foreignKey: "idInfluencer",
    as: "influencer"
});

Prospection.belongsTo(Squad, {
    foreignKey: "idSquad",
    as: "squad"
});

Prospection.hasOne(ProspectionUserActual, {
    foreignKey: "idProspection",
    as: "prospectionUserActual"
});

Prospection.hasMany(ProspectionUserOther, {
    foreignKey: "idProspection",
    as: "prospectionUserOther"
});

Prospection.hasOne(ProcessProspection, {
    foreignKey: "idProspection",
    as: "processProspection"
});

Prospection.hasOne(ProspectionInformation, {
  foreignKey: "idProspection",
  as: "prospectionInformation"
});

Prospection.hasOne(ProspectionWork, {
  foreignKey: "idProspection",
  as: "prospectionWork"
});

Prospection.belongsToMany(StatusProspection, {
  through: StatusStepProspection, as: "statusStepProspection",
  foreignKey: "idProspection",
  otherKey: 'idStatus'
});

Prospection.belongsToMany(Product, {
  through: ProductProspection, as: "productProspection",
  foreignKey: "idProspection",
  otherKey: 'idProduct'
});

Prospection.hasOne(ProspectionChecklist, {
  foreignKey: "idProspection",
  as: "checklist"
});

Prospection.hasOne(ProspectionChecklistAddress, {
  foreignKey: "idProspection",
  as: "checklistAddress"
});

Prospection.hasOne(ProspectionChecklistSocial, {
  foreignKey: "idProspection",
  as: "checklistSocial"
});

Prospection.hasMany(ProspectionChecklistBank, {
  foreignKey: "idProspection",
  as: "checklistBank"
});


Prospection.hasMany(ProspectionTokenDocument, {
  foreignKey: "idProspection",
  as: "tokenDocument"
});

Prospection.hasOne(ProspectionDocumentation, {
  foreignKey: "idProspection",
  as: "prospectionDocumentation"
});

Prospection.hasOne(ProspectionContract, {
  foreignKey: "idProspection",
  as: "prospectionContract"
});

Prospection.hasOne(ProspectionChecklistFile, {
  foreignKey: "idProspection",
  as: "prospectionChecklistFile"
});

Prospection.hasMany(ProspectionFinancial, {
  foreignKey: "idProspection",
  as: "prospectionFinancial"
});

Prospection.hasMany(ProspectionRenegotiation, {
  foreignKey: "idProspection",
  as: "prospectionRenegotiation"
});

Prospection.hasMany(ProspectionNotification, {
  foreignKey: "idProspection",
  as: "idProspection"
});

Prospection.hasOne(ProspectionDistraction, {
  foreignKey: "idProspection",
  as: "prospectionDistraction"
});

Prospection.hasOne(ProspectionRenovation, {
  foreignKey: "idProspection",
  as: "prospectionRenovation"

});

Prospection.hasMany(AdditiveTerm, {
  foreignKey: "idProspection",
  as: "prospectionAdditiveTerm"
});

Prospection.hasMany(ProspectionLogChangeStatus, {
  foreignKey: "idProspection",
  as: "prospectionId"
});
  
export default Prospection;