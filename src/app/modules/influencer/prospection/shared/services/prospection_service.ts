import { Transaction } from "sequelize/types";
import SquadError from "../../../../../shared/exceptions/squad/squad_exception";
import authService from "../../../../auth/shared/services/auth_service";
import Influencer from "../../../influencer_client/shared/models/influencer";
import influencerService from "../../../influencer_client/shared/services/influencer_service";
import squadRepository from "../../../squad/repository/squad_repository";
import Squad from "../../../squad/shared/models/squad";
import TypeInfluencer from "../../../type_influencer/shared/models/type_influencer";
import prospectionRepository from "../../repository/prospection_repository";
import AgeGroup from "../models/age_group";
import Exclusivity from "../models/exclusivity";
import Location from "../models/location";
import ProcessProspection from "../models/process_prospection";
import ProductProspection from "../models/product_prospection";
import Prospection from "../models/prospection";
import ProspectionInformation from "../models/prospection_information";
import ProspectionUserActual from "../models/prospection_user_actual";
import ProspectionUserOther from "../models/prospection_user_other";
import ProspectionWork from "../models/prospection_work";
import StatusProspection from "../models/status_prospection";
import StatusStepProspection from "../models/status_step_prospection";
import AuthError from "../../../../../shared/exceptions/auth/auth_exception";
import ProspectionChecklist from "../models/prospection_checklist";
import ProspectionChecklistAddress from "../models/prospection_checklist_address";
import ProspectionChecklistSocial from "../models/prospection_checklist_social";
import ProspectionError from "../../../../../shared/exceptions/prospection/prospection_exception";
import ProspectionTokenDocument from "../models/prospection_token_document";
import AuthConfig  from '../../../../../../config/auth';
import jwt from 'jsonwebtoken';
import ProspectionChecklistBank from "../models/prospection_checklist_bank_influencer";
import ProspectionContract from "../models/prospection_contract_influencer";
import ProspectionFinancial from "../models/prospection_financial";
import ProspectionChecklistFile from "../models/prospection_checklist_file";
import prospectionFunction from "../functions/prospection_function";
import SquadProspection from "../../../squad/shared/models/squad_prospection";
import ProspectionDocumentation from "../models/prospection_documentation";
import ProspectionDocumentationContractor from "../models/prospection_documentation_contractor";
import ProspectionDocumentationContractorFiles from "../models/prospection_documentation_contractor_files";
import ProspectionDocumentationIntervening from "../models/prospection_documentation_intervening";
import ProspectionDocumentationInterveningFiles from "../models/prospection_documentation_intervening_files";
import Monitoring from "../../../monitoring/shared/models/monitoring";
import ProspectionFinancialRequest from "../models/prospection_financial_request";
import ProspectionFinancialLog from "../models/prospection_financial_log";
import notificationService from "../../../../notification/shared/services/notification_service";
import prospectionAdditiveTermService from "./prospection_additive_term_service";
import ProspectionLogChangeStatus from "../models/prospection_log_change_status_influencer";
import fetch, { Headers } from "node-fetch";


class ProspectionService {

    async createNewProspection(newProspection: any, idUser: number, codUser: string, transactionProspetion: Transaction){

        try {

            const userProspection = await SquadProspection.findOne({ where: { idSquad: newProspection.idSquad, idUserProspection: idUser }});
            if(!userProspection){
                throw new ProspectionError("Apenas usuários do time de prospecção podem realizar o cadastro!");
            }

            const prospectionCreated = await Prospection.create({ cod: '', idInfluencer: newProspection.idInfluencer, idSquad: newProspection.idSquad }, { transaction: transactionProspetion });

            const codProspeccao = codUser.toLocaleUpperCase() + "_P" + prospectionCreated.id;
            await Prospection.update({ cod: codProspeccao}, { where: { id: prospectionCreated.id }, transaction: transactionProspetion});

            await ProspectionUserActual.create({ idProspection: prospectionCreated.id, idUser: idUser}, { transaction: transactionProspetion });
            await ProcessProspection.create({ idProspection: prospectionCreated.id, idStatus: 1, renegotiation: false, distraction: false }, { transaction: transactionProspetion });
            await StatusStepProspection.create({ idProspection: prospectionCreated.id, idStatus: 1, obs: false }, { transaction: transactionProspetion });

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async createProspectionFirstContact(prospection: any, idUser: number, transactionProspetion: Transaction){

        try {

            let audienceProspection = String(prospection.audience);
            audienceProspection = audienceProspection.replace(/\./g, '');
            const audience = Number(audienceProspection)

            await ProspectionInformation.create({ 
                public: prospection.public, audience: audience, following: prospection.following, cel: prospection.cel, idLocation: prospection.idLocation, 
                idAge: prospection.idAge, idProspection: prospection.idProspection
            }, { transaction: transactionProspetion });

            await ProcessProspection.update({ idStatus: 2 }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });
            await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 2, obs: false}, { transaction: transactionProspetion });

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async createProspectionNegotiation(prospection: any, idUser: number, transactionProspetion: Transaction){

        try {

            // check if the product is already registered
            const prospectionFindOne = await Prospection.findOne({ attributes: ['idInfluencer'], where: { id: prospection.idProspection }, raw: true});
            const productInfluencerList = await influencerService.allProductsUsedByInfluencer(Number(prospectionFindOne!.idInfluencer), 0);
            await influencerService.validateProductsInInfluencer(0, prospection.idProduct, productInfluencerList);

            // get the audience to use in the calc
            const prospectionFind = await ProspectionInformation.findOne({ where: { idProspection: prospection.idProspection }, raw: true});

            let valueProspection = String(prospection.value);
            // valueProspection = valueProspection.replace(/\./g, '');
            // valueProspection = valueProspection.replace(/\,/g, '.');
            const prospectionValue = Number(valueProspection);

            const mediaValue = Number((prospectionValue / Number(prospection.contractPeriod)).toFixed(2));
            const mediaAudience = Number((mediaValue / Number(prospectionFind!.audience)).toFixed(2));

            await ProspectionWork.create({ 
                initialDate: prospection.initialDate, finalDate: prospection.finalDate,contractPeriod: prospection.contractPeriod, mediaAudience: mediaAudience, value: prospection.value, mediaValue: mediaValue, 
                job: prospection.job, comments: prospection.comments, additionalImageUse: prospection.additionalImageUse, additionalPeriod: prospection.additionalPeriod, additionalPeriodValue: prospection.additionalPeriodValue, idType: prospection.idType, idExclusivity: prospection.idExclusivity, 
                idProspection: prospection.idProspection }, { transaction: transactionProspetion }
            );

            for (const index in prospection.idProduct) {
                await ProductProspection.create({ idProduct: prospection.idProduct[index], idProspection: prospection.idProspection }, { transaction: transactionProspetion });
            }

            await ProcessProspection.update({ idStatus: 3 }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });
            await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 3, obs: false}, { transaction: transactionProspetion });

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async updateProspectionFirstContact(prospection: any, idUser: number, transactionProspetion: Transaction){

        try {

            let audienceProspection = String(prospection.audience);
            audienceProspection = audienceProspection.replace(/\./g, '');
            const audience = Number(audienceProspection)

            await ProspectionInformation.update(
                { public: prospection.public, audience: audience, following: prospection.following, cel: prospection.cel,idLocation: prospection.idLocation,
                    idAge: prospection.idAge
                }, { where: { idProspection: prospection.idProspection  }, transaction: transactionProspetion }
            );

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async updateProspectionNegotiation(prospection: any, idUser: number, transactionProspetion: Transaction){

        try {

            // check if the product is already registered
            const prospectionFindOne = await Prospection.findOne({ attributes: ['idInfluencer'], where: { id: prospection.idProspection }, raw: true});
            const productInfluencerList = await influencerService.allProductsUsedByInfluencer(Number(prospectionFindOne!.idInfluencer), prospection.idProspection);
            await influencerService.validateProductsInInfluencer(0, prospection.idProduct, productInfluencerList);

            // get the audience to use in the calc
            const prospectionFind = await ProspectionInformation.findOne({ where: { idProspection: prospection.idProspection }, raw: true});

            let valueProspection = String(prospection.value);
            // valueProspection = valueProspection.replace(/\./g, '');
            // valueProspection = valueProspection.replace(/\,/g, '.');
            const prospectionValue = Number(valueProspection);

            const mediaValue = Number((Number(prospectionValue) / Number(prospection.contractPeriod)).toFixed(2));
            const mediaAudience = Number((mediaValue / Number(prospectionFind!.audience)).toFixed(2));

            await ProspectionWork.update({ 
                initialDate: prospection.initialDate, finalDate: prospection.finalDate,contractPeriod: prospection.contractPeriod, mediaAudience: mediaAudience, value: prospection.value, mediaValue: mediaValue, 
                job: prospection.job, comments: prospection.comments, additionalImageUse: prospection.additionalImageUse, additionalPeriod: prospection.additionalPeriod, additionalPeriodValue: prospection.additionalPeriodValue, idType: prospection.idType, idExclusivity: prospection.idExclusivity
                }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion }
            );

            await ProductProspection.destroy({ where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });

            for (const index in prospection.idProduct) {
                await ProductProspection.create({ idProduct: prospection.idProduct[index], idProspection: prospection.idProspection }, { transaction: transactionProspetion });
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async getAllProspection(initialDate: string, finalDate: string, typeInfluencer: number, instagramName: string, product: number, idUser: number, idSquad: number, status: number, userFilter: number, filter: number){

        try {

            var prospectionList: any[] = [];
            var prospectionListFormated: any[] = [];
            
            const isDirector: boolean = await authService.validateUserPolicy(idUser, 'influencer', 1);
            if(isDirector){
                if(filter === 0){
                    prospectionList = await prospectionRepository.getAll(idSquad); 
                }else{
                    prospectionList = await prospectionRepository.getAllByFilterProspection(this.createDynamicQueryFilter(initialDate, finalDate, typeInfluencer, instagramName, product, idSquad, status, userFilter)); 
                }
            }

            const isTeamLeader: boolean = await prospectionRepository.getTeamLeaderSquad(idUser, idSquad);
            if(isTeamLeader){
                if(filter === 0){
                    prospectionList = await prospectionRepository.getAll(idSquad); 
                }else{
                    prospectionList = await prospectionRepository.getAllByFilterProspection(this.createDynamicQueryFilter(initialDate, finalDate, typeInfluencer, instagramName, product, idSquad, status, userFilter)); 
                }
            }

            const isUserSquad: boolean = await prospectionRepository.getUserSquad(idUser, idSquad);
            if(isUserSquad){
                if(filter === 0){
                    prospectionList = await prospectionRepository.getAllByUser(idUser, idSquad); 
                }else{
                    prospectionList = await prospectionRepository.getAllByFilterProspection(this.createDynamicQueryFilter(initialDate, finalDate, typeInfluencer, instagramName, product, idSquad, status, idUser)); 
                }
            }

            if(prospectionList.length > 0){
                for (const index in prospectionList) {

                    if(prospectionList[index].status < 4){
                        
                        const disapproved = await StatusStepProspection.findOne({ where: { idProspection: prospectionList[index].id, idStatus: 7 }});
                        if(disapproved){
                            prospectionListFormated.push({
                                id: prospectionList[index].id,
                                idInfluencer: prospectionList[index].idInfluencer,
                                instagramName: prospectionList[index].instagramName,
                                name: prospectionList[index].name ?? '',
                                status: prospectionList[index].status,
                                statusName: prospectionList[index].statusName,
                                disapproved: true
                            });
                        }else{
                            prospectionListFormated.push({
                                id: prospectionList[index].id,
                                idInfluencer: prospectionList[index].idInfluencer,
                                instagramName: prospectionList[index].instagramName,
                                name: prospectionList[index].name ?? '',
                                status: prospectionList[index].status,
                                statusName: prospectionList[index].statusName,
                                disapproved: false
                            });
                        }
                    }else{
                        prospectionListFormated.push({
                            id: prospectionList[index].id,
                            idInfluencer: prospectionList[index].idInfluencer,
                            instagramName: prospectionList[index].instagramName,
                            name: prospectionList[index].name ?? '',
                            status: prospectionList[index].status,
                            statusName: prospectionList[index].statusName,
                            disapproved: false
                        });
                    }
                }

                return prospectionListFormated;

            }else{
                return prospectionList;
            }

        } catch (error) {
            throw error;
        }

    }

    createDynamicQueryFilter(initialDate: string, finalDate: string, typeInfluencer: number, instagramName: string, product: number, idSquad: number, status: number, userFilter: number): string {

        var query: string = '';

        if(initialDate != '0000-00-00' || finalDate != '0000-00-00'){
            if(initialDate != '0000-00-00' && finalDate == '0000-00-00'){
                if(query.length == 0){
                    query = query + ` SUBSTRING(process_prospection_influencer.created_at, 1, 10) >= '${initialDate}'`;
                }else{
                    query = query + ` and SUBSTRING(process_prospection_influencer.created_at, 1, 10) >= '${initialDate}'`;
                }
            }else if(initialDate == '0000-00-00' && finalDate != '0000-00-00'){
                if(query.length == 0){
                    query = query + ` SUBSTRING(process_prospection_influencer.updated_at, 1, 10) <= '${finalDate}'`;
                }else{
                    query = query + ` and SUBSTRING(process_prospection_influencer.updated_at, 1, 10) <= '${finalDate}'`;
                }
            }else{
                if(query.length == 0){
                    query = query + ` (SUBSTRING(process_prospection_influencer.created_at, 1, 10) >= '${initialDate}' and SUBSTRING(process_prospection_influencer.updated_at, 1, 10) <= '${finalDate}' )`;
                }else{
                    query = query + ` and (SUBSTRING(process_prospection_influencer.created_at, 1, 10) >= '${initialDate}' and SUBSTRING(process_prospection_influencer.updated_at, 1, 10) <= '${finalDate}' )`;
                }
            }
        }

        if(typeInfluencer > 0){
            if(query.length == 0){
                query = query + ` prospection_work_influencer.id_type = ${typeInfluencer}`;
            }else{
                query = query + ` and prospection_work_influencer.id_type = ${typeInfluencer}`;
            }
        }

        if(instagramName.length > 2){
            if(query.length == 0){
                query = query + ` influencer.instagram_name= '${instagramName}'`;
            }else{
                query = query + ` and influencer.instagram_name= '${instagramName}'`;
            }
        }

        if(product > 0){
            if(query.length == 0){
                query = query + ` product_prospection_influencer.id_product in (${product})`;
            }else{
                query = query + ` and product_prospection_influencer.id_product in (${product})`;
            }
        }

        if(status > 0){
            if(query.length == 0){
                query = query + ` process_prospection_influencer.id_status = ${status}`;
            }else{
                query = query + ` and process_prospection_influencer.id_status = ${status}`;
            }
        }

        if(idSquad > 0){
            if(query.length == 0){
                query = query + ` prospection_influencer.id_squad = ${idSquad}`;
            }else{
                query = query + ` and prospection_influencer.id_squad = ${idSquad}`;
            }
        }

        if(userFilter > 0){
            if(query.length == 0){
                query = query + ` prospection_user_actual_influencer.id_user = ${userFilter}`;
            }else{
                query = query + ` and prospection_user_actual_influencer.id_user = ${userFilter}`;
            }
        }

        return query;

    }

    async getStatus(){

        try {

            const statusList = await StatusProspection.findAll({ attributes: ['id', 'description'], order: ['id'] });
            return statusList;
            
        } catch (error) {
            throw error;
        }

    }
    
    async getLocations(){

        try {

            const locationList = await Location.findAll({ attributes: ['id', 'initials', 'state'], order: ['initials'] });
            return locationList;
            
        } catch (error) {
            throw error;
        }

    }

    async getAgeGroup(){

        try {

            const locationList = await AgeGroup.findAll({ attributes: ['id', 'description'] });
            return locationList;
            
        } catch (error) {
            throw error;
        }

    }

    async getExclusivity(){

        try {

            const locationList = await Exclusivity.findAll({ attributes: ['id', 'description'] });
            return locationList;
            
        } catch (error) {
            throw error;
        }

    }

    async getUserSquad(id: number){

        try {

            const typeList = await squadRepository.squadsByUserTeam(id);
            if(typeList.length === 0){
                throw new SquadError;
            }
            return typeList;
            
        } catch (error) {
            throw error;
        }

    }

    async getActualStatus(idProspection: number){

        try {

            const processProspection = await ProcessProspection.findOne({ attributes: ['idStatus'], where: { idProspection: idProspection }});
            if(processProspection){
                return processProspection.idStatus;
            }else{
                return 0;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async getMapping(idProspection: number){

        try {

            const mapping = await Prospection.findOne({
                attributes: ['cod'],
                where: { id: idProspection }, raw: true, nest: true,
                include: [
                    {
                        model: Influencer,  
                        as: 'influencer',
                        attributes: ['id', 'name', 'instagramName']
                    },
                    {
                        model: Squad,
                        as: 'squad',
                        attributes: ['id', 'name']
                    }
                ]
            });

            return mapping;
            
        } catch (error) {
            throw error;
        }

    }

    async getFirstContact(idProspection: number, status: number){

        try {

            var firstContact;
            if(status >= 2){
                firstContact = await ProspectionInformation.findOne({
                    attributes: ['public', 'audience', 'following', 'cel'],
                    where: { idProspection: idProspection }, raw: true, nest: true,
                    include: [
                        {
                            model: Location,  
                            as: 'location',
                            attributes: ['id', 'initials']
                        },
                        {
                            model: AgeGroup,
                            as: 'ageGroup',
                            attributes: ['id', 'description']
                        }
                    ]
                });
            }

            return firstContact;
            
        } catch (error) {
            throw error;
        }

    }

    async getNegotiation(idProspection: number, status: number){

        try {

            var negotiation: any;
            if(status >= 3){
                negotiation = await ProspectionWork.findOne({
                    attributes: ['initialDate', 'finalDate','contractPeriod', 'mediaAudience', 'value', 'mediaValue', 'job', 'comments', 'additionalImageUse', 'additionalPeriod', 'additionalPeriodValue'],
                    where: { idProspection: idProspection }, raw: true, nest: true,
                    include: [
                        {
                            model: TypeInfluencer,
                            as: 'typeInfluencer',
                            attributes: ['id', 'name']
                        },
                        {
                            model: Exclusivity,
                            as: 'exclusivity',
                            attributes: ['id', 'description']
                        }
                    ]
                });

                negotiation.value = parseInt(String(negotiation.value));
            };

            return negotiation;
            
        } catch (error) {
            throw error;
        }

    }

    async getInformationBeforeAprovation(idProspection: number, status: number, idUser: number){

        try {

            const negotiation = await this.getNegotiation(idProspection,status);

            const products = await prospectionRepository.getProductsByProspection(idProspection);

            var permissionUpdate;
            if(status === 4){
                const isDirector: boolean = await authService.validateUserPolicy(idUser, 'influencer', 1);
                const isTeamLeader: boolean = await authService.validateUserPolicy(idUser, 'influencer', 2);

                if(isDirector){
                    permissionUpdate = true;
                }else if(isTeamLeader){
                    (Number(negotiation.mediaValue) < 7000) ? permissionUpdate = true : permissionUpdate = false;
                }else{
                    permissionUpdate = false;
                }
            }else{
                permissionUpdate = false;
            }

            const result = {
                products: products,
                permissionUpdate: permissionUpdate
            }

            return result;
            
        } catch (error) {
            throw error;
        }

    }

    async getResponsable(idProspection: number){

        try {

            const userProspection: any = await prospectionRepository.responsableUserProspection(idProspection);

            var userChange;
            const userChangeProspection = await ProspectionUserOther.findAll({ where: { idProspection: idProspection }});
            (userChangeProspection.length > 0) ? userChange = true : userChange = false;

            return {
                user: userProspection.name,
                userChange: userChange
            }
            
        } catch (error) {
            throw error;
        }

    }

    async getStepStatus(idProspection: number){

        try {

            const steps = await StatusStepProspection.findAll({ 
                attributes: ['obs', 'comments', ['created_at', 'date']],
                where:{ idProspection: idProspection },
                include: [{
                    model: StatusProspection,
                    as: 'statusProspection',
                    attributes: ['id', 'description']
                }]
            });

            return steps;
            
        } catch (error) {
            throw error;
        }

    }

    async getUserProspection(){

        try {

            const users = await prospectionRepository.userProspectionAll();
            return users;
            
        } catch (error) {
            throw error;
        }

    }

    async getUserChanged(idProspection: number){

        try {

            const users = await prospectionRepository.userChangedProspection(idProspection);
            return users;
            
        } catch (error) {
            throw error;
        }

    }

    async requestApproval(prospection: any, idUser: number, transactionProspetion: Transaction){

        try {

            const prospectionActual = await ProcessProspection.findOne({ attributes: ['idStatus'], where: { idProspection: prospection.idProspection }, raw: true });
            if(prospectionActual!.idStatus === 3){
                await ProcessProspection.update({ idStatus: 4 }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });
                await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 4, obs: false }, { transaction: transactionProspetion });
            }else{
                throw new AuthError('Ação inválida para a etapa atual');
            }
            const messageNotification = await notificationService.createMessage(prospection.idProspection, 1, idUser)
            await notificationService.prospectionNotification(prospection.idProspection,1, 1, "Solicitação Aprovação Negociação", messageNotification.requestApproval, transactionProspetion)

        } catch (error) {
            throw error;
        }

    }

    async updateApproval(prospection: any, idUser: number, transactionProspetion: Transaction) {

        try {

            const typeInfluencer = await ProspectionWork.findOne({ attributes: ['idType'], where: { idProspection: prospection.idProspection }});
            const documentation = await ProspectionDocumentation.findOne({ attributes: ['isUnderage'], where: { idProspection: prospection.idProspection }});
            const prospectionActual = await ProcessProspection.findOne({ attributes: ['idStatus', 'renegotiation'], where: { idProspection: prospection.idProspection }, raw: true });
            if(prospectionActual!.idStatus === 4){
                const isDirector: boolean = await authService.validateUserPolicy(idUser, 'influencer', 1);
                const isTeamLeader: boolean = await authService.validateUserPolicy(idUser, 'influencer', 2);

                if(isDirector){
                    if(prospection.step === 3){
                        await ProcessProspection.update({ idStatus: prospection.step }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });
                        await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 7, obs: true, comments: prospection.comments }, { transaction: transactionProspetion });
                        await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: prospection.step, obs: false }, { transaction: transactionProspetion });
                        const messageNotification = await notificationService.createMessage(prospection.idProspection, 2)
                        await notificationService.prospectionNotification(prospection.idProspection, 1, 2, "Reprovação Negociação", messageNotification.repproval, transactionProspetion)
                    }else if(prospection.step === 9){
                        if(prospectionActual?.renegotiation){
                            if(typeInfluencer!.idType === 3 || documentation!.isUnderage){
                                await ProcessProspection.update({ idStatus: 16 }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });
                                await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 8, obs: true, comments: prospection.comments }, { transaction: transactionProspetion });
                                await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 16, obs: false }, { transaction: transactionProspetion });
                            }else{
                                await ProcessProspection.update({ idStatus: 15 }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });
                                await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 8, obs: true, comments: prospection.comments }, { transaction: transactionProspetion });
                                await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 15, obs: false }, { transaction: transactionProspetion });
                            }
                        }else{
                            await ProcessProspection.update({ idStatus: prospection.step }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });
                            await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 8, obs: true, comments: prospection.comments }, { transaction: transactionProspetion });
                            await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: prospection.step, obs: false }, { transaction: transactionProspetion });
                        }

                        const messageNotification = await notificationService.createMessage(prospection.idProspection, 2)
                        await notificationService.prospectionNotification(prospection.idProspection, 1, 2, "Aprovação Negociação", messageNotification.approval, transactionProspetion)
                    }else{
                        await ProcessProspection.update({ idStatus: prospection.step }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });
                        await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: prospection.step, obs: true, comments: prospection.comments }, { transaction: transactionProspetion });
                        const messageNotification = await notificationService.createMessage(prospection.idProspection, 2)
                        await notificationService.prospectionNotification(prospection.idProspection, 1, 2, "Aprovação Negociação", messageNotification.approval, transactionProspetion)
                    }
                }else if(isTeamLeader) {
                    const prospectionWork = await ProspectionWork.findOne({ attributes: ['mediaValue'], where: { idProspection: prospection.idProspection }, raw: true });
                    if(prospectionWork){
                        if(Number(prospectionWork.mediaValue) <= 7000){
                            if(prospection.step === 3){
                                await ProcessProspection.update({ idStatus: prospection.step }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });
                                await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 7, obs: true, comments: prospection.comments }, { transaction: transactionProspetion });
                                await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: prospection.step, obs: false }, { transaction: transactionProspetion });
                                const messageNotification = await notificationService.createMessage(prospection.idProspection, 2)
                                await notificationService.prospectionNotification(prospection.idProspection, 1, 2, "Reprovação Negociação", messageNotification.repproval, transactionProspetion)
                            }else if(prospection.step === 9){
                                if(prospectionActual?.renegotiation){
                                    if(typeInfluencer!.idType === 3 || documentation!.isUnderage){
                                        await ProcessProspection.update({ idStatus: 15 }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });
                                        await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 8, obs: true, comments: prospection.comments }, { transaction: transactionProspetion });
                                        await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 15, obs: false }, { transaction: transactionProspetion });
                                    }else{
                                        await ProcessProspection.update({ idStatus: 16 }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });
                                        await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 8, obs: true, comments: prospection.comments }, { transaction: transactionProspetion });
                                        await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 16, obs: false }, { transaction: transactionProspetion });
                                    }
                                }else{
                                    await ProcessProspection.update({ idStatus: prospection.step }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });
                                    await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 8, obs: true, comments: prospection.comments }, { transaction: transactionProspetion });
                                    await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: prospection.step, obs: false }, { transaction: transactionProspetion });
                                }

                                const messageNotification = await notificationService.createMessage(prospection.idProspection, 2)
                                await notificationService.prospectionNotification(prospection.idProspection, 1, 2, "Aprovação Negociação", messageNotification.approval, transactionProspetion)
                            }else{
                                await ProcessProspection.update({ idStatus: prospection.step }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });
                                await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: prospection.step, obs: true, comments: prospection.comments }, { transaction: transactionProspetion });
                                const messageNotification = await notificationService.createMessage(prospection.idProspection, 2)
                                await notificationService.prospectionNotification(prospection.idProspection, 1, 2, "Aprovação Negociação", messageNotification.approval, transactionProspetion)
                            }
                        }else{
                            throw new AuthError('Valor da média acima de R$ 3.000,00 apenas diretor pode aprovar!');
                        }
                    }else{
                        throw new AuthError('Valor da média não foi aplicado corretamente!');
                    }
                }else{
                    throw new AuthError('Ação válida apenas para diretor e team leader');
                }
            }else{
                throw new AuthError('Ação inválida para a etapa atual');
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async disapproveProsepction(prospection: any, idUser: number, transactionProspetion: Transaction) {

        try {

            await ProcessProspection.update({ idStatus: 6 }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });
            await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 6, obs: true, comments: prospection.comments });

            const messageNotification = await notificationService.createMessage(prospection.idProspection, 2, idUser);
            await notificationService.prospectionNotification(prospection.idProspection, 1, 2, "Reprovação Negociação", messageNotification.repproval, transactionProspetion);
            
        } catch (error) {
            throw error;
        }

    }

    async updateStatusProsepction(prospection: any, type: number, step: number, step2: number, transactionProspetion: Transaction) {

        try {

            if(type === 0){
                await StatusStepProspection.create({ idProspection: prospection, idStatus: step, obs: false });
                await ProcessProspection.update({ idStatus: step }, { where: { idProspection: prospection }, transaction: transactionProspetion});
            }else{
                await StatusStepProspection.create({ idProspection: prospection, idStatus: step, obs: false });
                await StatusStepProspection.create({ idProspection: prospection, idStatus: step2, obs: false });
                await ProcessProspection.update({ idStatus: step2 }, { where: { idProspection: prospection }, transaction: transactionProspetion});
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async createChecklist(prospection: any, transactionProspetion: Transaction) {

        try {

            await ProspectionChecklist.create({
                nickname: prospection.nickname, nameFull: prospection.fullName, class: prospection.class, fallowers: prospection.fallowers, advice: prospection.advice, 
                coupon: prospection.coupon, birthday: prospection.birthday, idProspection: prospection.idProspection
            }, { transaction: transactionProspetion } );

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async createChecklistAddress(prospection: any, transactionProspetion: Transaction) {

        try {

            await ProspectionChecklistAddress.create({
                cep: prospection.cep, address: prospection.address, city: prospection.city, district: prospection.district, uf: prospection.uf, 
                number: prospection.number, complement: prospection.complement, idProspection: prospection.idProspection
            }, { transaction: transactionProspetion } );

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async createChecklistSocial(prospection: any, transactionProspetion: Transaction) {

        try {

            const prospectionget = await ProspectionWork.findOne({ attributes: ['value'], where: { idProspection: prospection.idProspection }, raw: true });
            if(!prospectionget){
                throw new ProspectionError();
            }

            var mediaProspection = prospectionFunction.calculateMediaSocial(prospection);

            if(Number(prospectionget!.value) != Number(mediaProspection.mediaValue)){
                throw new ProspectionError(`A soma dos valores não bate com o valor total (${prospectionget!.value})!`);
            }

            await ProspectionChecklistSocial.create({
                bowlSend: prospection.bowlSend,observation: prospection.observation, paidPartnership: prospection.paidPartnership, paidPartnershipValue: prospection.paidPartnershipValue, storie: prospection.storie, storieValue: mediaProspection.storieValue, personalStoriePosted: prospection.personalStoriePosted, photo: prospection.photo, photoValue: mediaProspection.photoValue, photoFeedValue: mediaProspection.photoFeedValue, receivedPhotoDate: prospection.receivedPhotoDate, postPhotoFeedDate: prospection.postPhotoFeedDate, postPhoto: prospection.postPhoto, photoFeed: prospection.photoFeed,
                video: prospection.video, videoValue: mediaProspection.videoValue, videoFeed: prospection.videoFeed, videoFeedValue: mediaProspection.videoFeedValue, videoDuration: prospection.videoDuration, videoFormat: prospection.videoFormat, videoUploadDate: prospection.videoUploadDate, receivedVideoDate: prospection.receivedVideoDate, postVideo: prospection.postVideo, postVideoDate: prospection.postVideoDate, canPublishInPublicityDay: prospection.canPublishInPublicityDay, observationOtherPublicity: prospection.observationOtherPublicity, tiktok: prospection.tiktok, tiktokValue: mediaProspection.tiktokValue,
                tiktokFeed: prospection.tiktokFeed, tiktokFeedValue: mediaProspection.tiktokFeedValue, igtv: prospection.igtv, igtvValue: mediaProspection.igtvValue, igtvFeed: prospection.igtvFeed, igtvFeedValue: mediaProspection.igtvFeedValue,
                live: prospection.live, liveValue: mediaProspection.liveValue, liveSave: prospection.liveSave, liveSaveValue: mediaProspection.liveSaveValue, youtube: prospection.youtube, youtubeValue: mediaProspection.youtubeValue,
                youtubeFeed: prospection.youtubeFeed, youtubeFeedValue: mediaProspection.youtubeFeedValue, brandExclusive: prospection.brandExclusive, segmentExclusive: prospection.segmentExclusive, allowBoost: prospection.allowBoost, segmentExclusiveValue: mediaProspection.segmentExclusiveValue,
                idProspection: prospection.idProspection, commentBoost: prospection.commentBoost, valueUseImage: prospection.valueUseImageValue, commentChecklist: prospection.commentChecklist, additionalImageUse: prospection.additionalImageUse, additionalPeriod: prospection.additionalPeriod, additionalPeriodValue: prospection.additionalPeriodValue
            }, { transaction: transactionProspetion } );

            if(prospection.effectiveDate) await ProspectionContract.create({effectiveDate: prospection.effectiveDate, useImageDate: prospection.useImageDate, isAdditiveTerm: false, idProspection: prospection.idProspection})
            
            await ProcessProspection.update({ idStatus: 18 }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion });
            await StatusStepProspection.create({ idProspection: prospection.idProspection, idStatus: 18, obs: false }, { transaction: transactionProspetion });

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async updateChecklist(checklist: any, transactionProspection: Transaction) {

        try {
            
            // const statusValidate = await ProcessProspection.findOne({where: {idProspection: checklist.idProspection}})
            // if(statusValidate!.idStatus >= 25) throw new ProspectionError("Não é possível alterar os dados para prospecções com o status atual!"); 
            await ProspectionChecklist.update({ nickname: checklist.nickname, nameFull: checklist.fullName, class: checklist.class, fallowers: checklist.fallowers, advice: checklist.advice, 
                coupon: checklist.coupon, birthday: checklist.birthday},{where: { idProspection: checklist.idProspection},transaction: transactionProspection})
            return
        }
        catch (error) {
            throw error
        }
    }

    async updateChecklistSocial(checklistSocial: any, commentChecklist: string, transactionProspection: Transaction) {

        try {
            // const statusValidate = await ProcessProspection.findOne({where: {idProspection: checklistSocial.idProspection}})
            // if(statusValidate!.idStatus >= 25) {
            //     throw new ProspectionError("Não é possível alterar os dados para prospecções com o status atual!");
            // }
            await ProspectionChecklistSocial.update({bowlSend: checklistSocial.bowlSend, observation: checklistSocial.observation, paidPartnership: checklistSocial.paidPartnership, paidPartnershipValue: checklistSocial.paidPartnershipValue,  storie: checklistSocial.storie, storieValue: checklistSocial.storieValue, personalStoriePosted: checklistSocial.personalStoriePosted, photo: checklistSocial.photo, photoValue: checklistSocial.photoValue, photoFeedValue: checklistSocial.photoFeedValue, receivedPhotoDate: checklistSocial.receivedPhotoDate, postPhotoFeedDate: checklistSocial.postPhotoFeedDate, postPhoto: checklistSocial.postPhoto, photoFeed: checklistSocial.photoFeed,
                video: checklistSocial.video, videoValue: checklistSocial.videoValue, videoFeed: checklistSocial.videoFeed, videoFeedValue: checklistSocial.videoFeedValue, videoDuration: checklistSocial.videoDuration, videoFormat:checklistSocial.videoFormat, videoUploadDate: checklistSocial.videoUploadDate, receivedVideoDate: checklistSocial.receivedVideoDate, postVideo: checklistSocial.postVideo, postVideoDate: checklistSocial.postVideoDate, canPublishInPublicityDay: checklistSocial.canPublishInPublicityDay, observationOtherPublicity: checklistSocial.observationOtherPublicity, tiktok: checklistSocial.tiktok, tiktokValue: checklistSocial.tiktokValue,
                tiktokFeed: checklistSocial.tiktokFeed, tiktokFeedValue: checklistSocial.tiktokFeedValue, igtv: checklistSocial.igtv, igtvValue: checklistSocial.igtvValue, igtvFeed: checklistSocial.igtvFeed, igtvFeedValue: checklistSocial.igtvFeedValue,
                live: checklistSocial.live, liveValue: checklistSocial.liveValue, liveSave: checklistSocial.liveSave, liveSaveValue: checklistSocial.liveSaveValue, youtube: checklistSocial.youtube, youtubeValue: checklistSocial.youtubeValue,
                youtubeFeed: checklistSocial.youtubeFeed, youtubeFeedValue: checklistSocial.youtubeFeedValue, brandExclusive: checklistSocial.brandExclusive, segmentExclusive: checklistSocial.segmentExclusive, allowBoost: checklistSocial.allowBoost, segmentExclusiveValue: checklistSocial.segmentExclusiveValue,
                idProspection: checklistSocial.idProspection, commentBoost: checklistSocial.commentBoost, valueUseImage: checklistSocial.valueUseImageValue, commentChecklist: commentChecklist, additionalImageUse: checklistSocial.additionalImageUse, additionalPeriod: checklistSocial.additionalPeriod, additionalPeriodValue: checklistSocial.additionalPeriodValue}, { where: {idProspection: checklistSocial.idProspection }, transaction: transactionProspection}) // Verificar alteração do idProspection
            
            const verify = await ProspectionContract.findOne({where:{idProspection: checklistSocial.idProspection}})
            console.log(verify)
            if(verify) await ProspectionContract.update({effectiveDate: checklistSocial.effectiveDate, useImageDate: checklistSocial.useImageDate},{where: {idProspection: checklistSocial.idProspection}})
            
            return
        }
        catch(error) {
            throw error;
        }
    }

    async updateProspectionFinancial(payment: any, transactionProspection: Transaction) {

        try {
            // const statusValidate = await ProcessProspection.findOne({where: {idProspection: payment.idProspection}})
            // if(statusValidate!.idStatus >= 25) {
            //     throw new ProspectionError("Não é possível alterar os dados para prospecções com o status atual!");
            // }
            
            for (const index in payment.payments){
                await ProspectionFinancial.update({ datePayment: payment.payments[index].datePayment}, {where: {id: payment.payments[index].idPayment}, transaction: transactionProspection})
            }
            return 
        }
        catch(error) {
            throw error
        }
    }

    async createChecklistBank(prospection: any, file: any, transactionProspetion: Transaction) {

        try {

            let urlBank;
            if(prospection.receiptBank){
                if(file){
                    const { filename: path } = file;
                    urlBank = path;
                }else{
                    throw new ProspectionError('Falta anexar o comprovante bancário!');
                }
            }
            
            await ProspectionChecklistBank.create({
                percentage: prospection.percentage, mainName: prospection.mainName, cpfCnpj: prospection.cpfCnpj, bank: prospection.bank, agency: prospection.agency,
                account: prospection.account, typePix: prospection.typePix, pix: prospection.pix, receiptBank: prospection.receiptBank, urlBank: urlBank, idProspection: prospection.idProspection
            }, { transaction: transactionProspetion } );   
            

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async createTokenDocument(prospection: any) {

        try {

            const token = jwt.sign({idProspection: prospection.idProspection, time: new Date()}, AuthConfig.cod!, {expiresIn: AuthConfig.expiresInTokenDocument});
            await ProspectionTokenDocument.create({ idProspection: prospection.idProspection, token: token });

            const linkNew: any = await fetch('https://bityli.com/api/url/add', { method: 'POST', body: JSON.stringify({url: `https://hera-prod.vercel.app/influencer/validate-token/${token}`}) , headers: new Headers({ 'Authorization': 'Bearer WNXROhZpdSNDpni434163', "Content-Type": "application/json" })});
            if (!linkNew.ok) throw new Error(`Problema com o gerador de link!`);
            const data = await linkNew.json();
            return data.shorturl;
            
        } catch (error) {
            throw error;
        }

    }

    async validateTokenDocument(token: any) {

        try {

            const tokenProspection = await ProspectionTokenDocument.findOne({ where: { token: token }, raw: true });
            if(!tokenProspection){
                throw new ProspectionError('Token inválido para a operação');
            }

            var idProspection;
            jwt.verify(token, AuthConfig.cod!, (err: any, decoded: any) => {
                if (err || !decoded) {
                    throw new AuthError('Token expirado ou inválido!');
                }else{
                    idProspection = decoded.idProspection;
                }
            });

            let update;
            const existDocument = await ProspectionDocumentation.findOne({ where: { idProspection: idProspection }, raw: true });
            if(!existDocument){
                update = false; 
                return { idProspection: idProspection, update: update };
            }else{

                const existContract = await ProspectionDocumentationContractor.findOne({ where: { idDocumentation: existDocument!.id }, raw: true });
                const existIntervenieng = await ProspectionDocumentationIntervening.findOne({ where: { idDocumentation: existDocument!.id }, raw: true });
                const existBanck = await ProspectionChecklistBank.findOne({ where: { idProspection: idProspection}, raw: true });
                const existAddress = await ProspectionChecklistAddress.findOne({ where: { idProspection: idProspection}, raw: true });

                if(!existContract || !existIntervenieng || !existBanck || !existAddress){
                    update = false; 
                    return { idProspection: idProspection, update: update };
                }else{
                    update = true;
                    const commentsErrorDoc = await StatusStepProspection.findOne({ where: { idProspection: idProspection, idStatus: 13 }, order: [['id', 'desc']]});
                    return { idProspection: idProspection, update: update, comments: commentsErrorDoc?.comments };
                }

            }
            
        } catch (error) {
            throw error;
        }

    }

    async getAllDocumentation(idProspection: any) {

        try {

            const documentation = await ProspectionDocumentation.findOne({ where: { idProspection: idProspection }});
            if(documentation){
                let contractor: any = await ProspectionDocumentationContractor.findAll({ attributes: ['id', 'name', 'rg', 'cpf', 'nacionality', 'civilState', 'job', 'tel', 'email', 'isUnderage'],  where: { idDocumentation: documentation.id }, raw: true});
                if(contractor.length > 0){
                    for (const index in contractor) {
                        const file = await ProspectionDocumentationContractorFiles.findAll({ attributes: ['url', 'subtitle'], where: { idDocumentationContractor: contractor[index].id }});
                        contractor[index].files = file;
                    }
                }else{
                    throw new ProspectionError("Não foi possível localizar a documentação dos contratados!");
                }

                let contractorIntervening: any = await ProspectionDocumentationIntervening.findAll({ attributes: ['id', 'corporateName', 'email', 'tel'],  where: { idDocumentation: documentation.id }, raw: true});
                if(contractorIntervening.length > 0){
                    for (const index in contractorIntervening) {
                        const file = await ProspectionDocumentationInterveningFiles.findAll({ attributes: ['url', 'subtitle'], where: { idDocumentationIntervening: contractorIntervening[index].id }});
                        contractorIntervening[index].files = file;
                    }
                }else{
                    throw new ProspectionError("Não foi possível localizar a documentação dos intervenientes!");
                }

                const docBank = await ProspectionChecklistBank.findAll({ attributes: ['id', 'percentage', 'mainName', 'cpfCnpj', 'bank', 'agency', 'account', 'typePix', 'pix', 'receiptBank', 'urlBank'], where: { idProspection: idProspection }});
                if(docBank.length === 0){
                    throw new ProspectionError("Não foi possível localizar a documentação dos dados bancários!");
                }

                const docAddress = await ProspectionChecklistAddress.findAll({ attributes: ['cep', 'address', 'city', 'district', 'uf', 'number', 'complement'], where: { idProspection: idProspection }});
                if(!docAddress){
                    throw new ProspectionError("Não foi possível localizar a documentação do endereço!");
                }

                return { idDocumentation: documentation.id, contractor: contractor, intervening: contractorIntervening, bank: docBank, address: docAddress };

            }else{
                throw new ProspectionError("Não foi possível localizar a documentação!");
            }

        } catch (error) {
            throw error;
        }

    }

    async deleteAllTokenDocument(idProspection: any, transactionProspection: Transaction) {

        try {

            await ProspectionTokenDocument.destroy({ where: { idProspection: idProspection }, transaction: transactionProspection });

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async updateChecklistAddress(prospection: any, transactionProspetion: Transaction) {

        try {

            await ProspectionChecklistAddress.update({
                cep: prospection.cep, address: prospection.address, city: prospection.city, district: prospection.district, uf: prospection.uf, 
                number: prospection.number, complement: prospection.complement, idProspection: prospection.idProspection
            }, { where: { idProspection: prospection.idProspection }, transaction: transactionProspetion } );

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async updateChecklistBank(prospection: any, file:any, transactionProspetion: Transaction) {

        try {

            let urlBank;
            if(prospection.receiptBank){
                if(file){
                    const { filename: path } = file;
                    urlBank = path;
                }else{
                    throw new ProspectionError('Falta anexar o comprovante bancário!');
                }
            }

            await ProspectionChecklistBank.update({
                percentage: prospection.percentage, mainName: prospection.mainName, cpfCnpj: prospection.cpfCnpj, bank: prospection.bank, agency: prospection.agency,
                account: prospection.account, typePix: prospection.typePix, pix: prospection.pix, receiptBank: prospection.receiptBank, urlBank: urlBank
            }, { where: { id: prospection.id }, transaction: transactionProspetion } );   

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async getAddressDocument(idProspection: number) {

        try {

            const address =  await ProspectionChecklistAddress.findOne({ 
                attributes: [
                    'cep', 'address', 'city', 'district', 'uf', 'number', 'complement', 'idProspection'
                ], where: { idProspection: idProspection }});

            return address;
            
        } catch (error) {
            throw error;
        }

    }

    async getBankDocument(idProspection: number) {

        try {

            const bank =  await ProspectionChecklistBank.findAll({ 
                attributes: [
                    'id', 'percentage', 'mainName', 'cpfCnpj', 'bank', 'agency', 'account', 'typePix', 'pix', 'receiptBank', 'urlBank'
                ], where: { idProspection: idProspection }});

            return bank;
            
        } catch (error) {
            throw error;
        }

    }

    async getContract(idProspection: number) {

        try {

            const contract = await ProspectionContract.findOne({ attributes: ['urlContract', 'observation', 'effectiveDate', 'useImageDate', 'annexType', 'annexTypeObservation'], where: { idProspection: idProspection }});
            const isAdditiveTerm = await ProspectionContract.findOne({where: {idProspection: idProspection}})
            
            if(isAdditiveTerm?.isAdditiveTerm === true) {
                var additiveTerm: any = await prospectionAdditiveTermService.getAdditiveTermDocumentation(idProspection)
            }

            return { url: contract?.urlContract, observation: contract?.observation, effectiveDate: contract?.effectiveDate, useImageDate: contract?.useImageDate, annexType: contract?.annexType, annexTypeObservation: contract?.annexTypeObservation,  additiveTerm: additiveTerm };
            
        } catch (error) {
            throw error;
        }

    }

    async getChecklist(idProspection: number) {

        try {

            const contract = await ProspectionChecklistFile.findOne({ attributes: ['urlChecklist'], where: { idProspection: idProspection }});

            return { url: contract?.urlChecklist };
            
        } catch (error) {
            throw error;
        }

    }
    
    async getContractOrChecklist(idProspection: number) {

        try {

            const typeInfluencer = await ProspectionWork.findOne({ attributes: ['idType'], where: { idProspection: idProspection }});
            const documentation = await ProspectionDocumentation.findOne({ attributes: ['isUnderage'], where: { idProspection: idProspection }});
            
            if(typeInfluencer!.idType === 3 || documentation!.isUnderage){
                const document = await ProspectionChecklistFile.findOne({ where: { idProspection: idProspection }});

                return { url: document!.urlChecklist, description: 'checklist' };
            }else{
                const document = await ProspectionContract.findOne({ where: { idProspection: idProspection }});
                return { url: document!.urlContract, description: 'contrato', observation: document!.observation };
            }
            
        } catch (error) {
            throw error;
        }

    }

    async getFormChecklist(idProspection: number) {

        try {

            let checklist = await ProspectionChecklist.findOne({ attributes: ['nickname', 'nameFull', 'class', 'fallowers', 'advice', 'coupon', 'birthday'], where: { idProspection: idProspection }});
            return checklist;
            
        } catch (error) {
            throw error;
        }

    }

    async getChecklistValuesSocial(idProspection: number) {

        try {

            let checklist = await ProspectionChecklistSocial.findOne({ where: { idProspection: idProspection }});
            let contract = await ProspectionContract.findOne({where: {idProspection: idProspection}})
            return {
                bowlSend: checklist?.bowlSend,observation: checklist?.observation, paidPartnership: checklist?.paidPartnership, paidPartnershipValue: checklist?.paidPartnershipValue, storie: checklist?.storie, storieValue: checklist?.storieValue, personalStoriePosted: checklist?.personalStoriePosted, photo: checklist?.photo, photoValue: checklist?.photoValue, photoFeedValue: checklist?.photoFeedValue,
                receivedPhotoDate: checklist?.receivedPhotoDate, postPhotoFeedDate: checklist?.postPhotoFeedDate, postPhoto: checklist?.postPhoto, photoFeed: checklist?.photoFeed,
                video: checklist?.video, videoValue: checklist?.videoValue, videoFeed: checklist?.videoFeed, videoFeedValue: checklist?.videoFeedValue, videoDuration: checklist?.videoDuration, videoFormat: checklist?.videoFormat, videoUploadDate: checklist?.videoUploadDate, receivedVideoDate: checklist?.receivedVideoDate, postVideo: checklist?.postVideo, postVideoDate: checklist?.postVideoDate, canPublishInPublicityDay: checklist?.canPublishInPublicityDay, observationOtherPublicity: checklist?.observationOtherPublicity, tiktok: checklist?.tiktok, tiktokValue: checklist?.tiktokValue,
                tiktokFeed: checklist?.tiktokFeed, tiktokFeedValue: checklist?.tiktokFeedValue, igtv: checklist?.igtv, igtvValue: checklist?.igtvValue, igtvFeed: checklist?.igtvFeed, igtvFeedValue: checklist?.igtvFeedValue,
                live: checklist?.live, liveValue: checklist?.liveValue, liveSave: checklist?.liveSave, liveSaveValue: checklist?.liveSaveValue, youtube: checklist?.youtube, youtubeValue: checklist?.youtubeValue,
                youtubeFeed: checklist?.youtubeFeed, youtubeFeedValue: checklist?.youtubeFeedValue, brandExclusive: checklist?.brandExclusive, segmentExclusive: checklist?.segmentExclusive, allowBoost: checklist?.allowBoost, segmentExclusiveValue: checklist?.segmentExclusiveValue,
                idProspection: idProspection, commentBoost: checklist?.commentBoost, valueUseImage: checklist?.valueUseImage, commentChecklist: checklist?.commentChecklist, additionalImageUse: checklist?.additionalImageUse, additionalPeriod: checklist?.additionalPeriod, additionalPeriodValue: checklist?.additionalPeriodValue, effetiveDate: contract?.effectiveDate, useImageDate: contract?.useImageDate
            } ;
            
        } catch (error) {
            throw error;
        }

    }

    async getPayment(idProspection: number) {

        try {

            let payments = await ProspectionFinancial.findAll({ attributes: ['id','datePayment', 'confirmPayment'], where: { idProspection: idProspection }});
            
            return payments;
            
        } catch (error) {
            throw error;
        }

    }

    async getCommentsEmailsContract(idProspection: number) {

        try {

            let commentsEmails = await StatusStepProspection.findAll({ attributes: [ 'comments'], where: { idProspection: idProspection, idStatus: 27 }});
            
            return commentsEmails[0];
            
        } catch (error) {
            throw error;
        }

    }


    // ******** DOCUMENTATION ********

    async validateDocumentation(doc: any){

        try {

            const validateToken = await ProspectionDocumentation.findOne({ attributes: ['id'], where: { idProspection: doc.idProspection, token: doc.token }});
            if(validateToken){
                return validateToken.id;
            }else{
                return 0;
            }
            
        } catch (error) {   
            throw error;
        }

    }

    async createDocumentation(doc: any, transactionProspection: Transaction){

        try {

            const documentation = await ProspectionDocumentation.create({ 
                idProspection: doc.idProspection, isUnderage: doc.isUnderage, token: doc.token
            }, { transaction: transactionProspection });

            return documentation.id;
            
        } catch (error) {
            throw error;
        }

    }

    async insertContractorDocumentation(doc: any, idDocumentation: number, transactionProspection: Transaction){

        try {

            const docContractor = await ProspectionDocumentationContractor.create({ 
                name: doc.name, rg: doc.rg, cpf: doc.cpf, nacionality: doc.nacionality, civilState: doc.civilState, job: doc.job, tel: doc.tel,
                email: doc.email, isUnderage: doc.isUnderage, idDocumentation: idDocumentation
            }, { transaction: transactionProspection });

            return docContractor.id;
            
        } catch (error) {
            throw error;
        }

    }

    async insertContractorDocumentationFiles(doc: any, files: any, idDocumentationContractor: number, transactionProspection: Transaction){

        try {

            if(doc.isUnderage){
                if(files.length > 0 ){
                    for (const index in files) {
                        const { filename: path } = files[index];
                        var urlContract = path;

                        const subtitle = prospectionFunction.validateSubtitleUnderage(files, Number(index));

                        await ProspectionDocumentationContractorFiles.create({ 
                            idDocumentationContractor: idDocumentationContractor, url: urlContract, subtitle: subtitle
                        }, { transaction: transactionProspection });
                    }
                }else{
                    throw new ProspectionError('Falta anexar documentos obrigatórios!');
                }
            }else{
                if(files.length === 3 ){
                    for (const index in files) {
                        const { filename: path } = files[index];
                        var urlContract = path;

                        const subtitle = prospectionFunction.validateSubtitle(Number(index));

                        await ProspectionDocumentationContractorFiles.create({ 
                            idDocumentationContractor: idDocumentationContractor, url: urlContract, subtitle: subtitle
                        }, { transaction: transactionProspection });
                    }
                }else{
                    throw new ProspectionError('Falta anexar documentos obrigatórios!');
                }
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async updateContractorDocumentation(doc: any, transactionProspection: Transaction){

        try {

            await ProspectionDocumentationContractor.update({ 
                name: doc.name, rg: doc.rg, cpf: doc.cpf, nacionality: doc.nacionality, civilState: doc.civilState, job: doc.job, tel: doc.tel,
                email: doc.email, isUnderage: doc.isUnderage
            }, { where: { id: doc.id }, transaction: transactionProspection });

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async updateContractorDocumentationFiles(doc: any, files: any, idDocumentationContractor: number, transactionProspection: Transaction){

        try {

            await ProspectionDocumentationContractorFiles.destroy({ where: { idDocumentationContractor: idDocumentationContractor } });

            if(doc.isUnderage){
                if(files.length > 0 ){
                    for (const index in files) {
                        const { filename: path } = files[index];
                        var urlContract = path;

                        const subtitle = prospectionFunction.validateSubtitleUnderage(files, Number(index));

                        await ProspectionDocumentationContractorFiles.create({ 
                            idDocumentationContractor: idDocumentationContractor, url: urlContract, subtitle: subtitle
                        }, { transaction: transactionProspection });
                    }
                }else{
                    throw new ProspectionError('Falta anexar documentos obrigatórios!');
                }
            }else{
                if(files.length === 3 ){
                    for (const index in files) {
                        const { filename: path } = files[index];
                        var urlContract = path;

                        const subtitle = prospectionFunction.validateSubtitle(Number(index));

                        await ProspectionDocumentationContractorFiles.create({ 
                            idDocumentationContractor: idDocumentationContractor, url: urlContract, subtitle: subtitle
                        }, { transaction: transactionProspection });
                    }
                }else{
                    throw new ProspectionError('Falta anexar documentos obrigatórios!');
                }
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async updateDocumentation(doc: any, idDocumentation: number, transactionProspection: Transaction){

        try {

            if(doc.isUnderage){
                await ProspectionDocumentation.update({ isUnderage: true }, { where: { id: idDocumentation }, transaction: transactionProspection });
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async insertInterveningDocumentation(doc: any, idDocumentation: number, transactionProspection: Transaction){

        try {

            const docIntervening = await ProspectionDocumentationIntervening.create({ 
                corporateName: doc.corporateName, email: doc.email, tel: doc.tel, idDocumentation: idDocumentation
            }, { transaction: transactionProspection });

            return docIntervening.id;
            
        } catch (error) {
            throw error;
        }

    }

    async updateInterveningDocumentation(doc: any, transactionProspection: Transaction){

        try {

            await ProspectionDocumentationIntervening.update({ 
                corporateName: doc.corporateName, email: doc.email, tel: doc.tel
            }, { where: { id: doc.id }, transaction: transactionProspection});

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async insertInterveningDocumentationFiles(doc: any, files: any, idDocumentationIntervening: number, transactionProspection: Transaction){

        try {

            if(files.length >= 3 ){
                for (const index in files) {
                    const { filename: path } = files[index];
                    var urlContract = path;

                    if(index){

                    }

                    const subtitle = prospectionFunction.validateSubtitleIntervening(Number(index));

                    await ProspectionDocumentationInterveningFiles.create({ 
                        idDocumentationIntervening: idDocumentationIntervening, url: urlContract, subtitle: subtitle
                    }, { transaction: transactionProspection });
                }
            }else{
                throw new ProspectionError('Falta anexar documentos obrigatórios!');
            }
            
            return;
            
        } catch (error) {
            throw error;
        }

    }

    async updateInterveningDocumentationFiles(doc: any, files: any, idDocumentationIntervening: number, transactionProspection: Transaction){

        try {

            await ProspectionDocumentationInterveningFiles.destroy({ where: { idDocumentationIntervening: idDocumentationIntervening } });

            if(files.length >= 3 ){
                for (const index in files) {
                    const { filename: path } = files[index];
                    var urlContract = path;

                    if(index){

                    }

                    const subtitle = prospectionFunction.validateSubtitleIntervening(Number(index));

                    await ProspectionDocumentationInterveningFiles.create({ 
                        idDocumentationIntervening: idDocumentationIntervening, url: urlContract, subtitle: subtitle
                    }, { transaction: transactionProspection });
                }
            }else{
                throw new ProspectionError('Falta anexar documentos obrigatórios!');
            }
            
            return;
            
        } catch (error) {
            throw error;
        }

    }

    async clearDocumentation(doc: any, transactionProspection: Transaction){

        try {

            await ProspectionDocumentation.destroy({ where: { idProspection: doc.idProspection }, transaction: transactionProspection });
            await ProspectionChecklistBank.destroy({ where: { idProspection: doc.idProspection }, transaction: transactionProspection });
            await ProspectionChecklistAddress.destroy({ where: { idProspection: doc.idProspection }, transaction: transactionProspection });
            // CASCADE IN TOHER TABLES - DOC. CONTRACTOR AND CONTRATCOR FILES
            
        } catch (error) {
            throw error;
        }

    }

    // ******** END DOCUMENTATION ********



    async approvalDocument(document: any, transactionProspection: Transaction) {

        try {

            const typeInfluencer = await ProspectionWork.findOne({ attributes: ['idType'], where: { idProspection: document.idProspection }});
            const documentation = await ProspectionDocumentation.findOne({ attributes: ['isUnderage'], where: { idProspection: document.idProspection }});

            if(!typeInfluencer || !documentation)
                throw new ProspectionError("Não foi verficar o tipo do influenciador");

            if(document.step === 14){ // disapprove
                await StatusStepProspection.create({ obs: true, comments: document.comments, idProspection: document.idProspection, idStatus: 13 }, { transaction: transactionProspection });
                await StatusStepProspection.create({ obs: false, idProspection: document.idProspection, idStatus: 14 }, { transaction: transactionProspection });
                await ProcessProspection.update({ idStatus: 14 }, { where: { idProspection: document.idProspection }, transaction: transactionProspection });

            }else if(document.step === 15){ // approved

                // * obs - se o contrato for G.I ou o tipo do influenciador for de menor de idade, apenas o jurídico pode gerar o contrato 
                if(typeInfluencer.idType === 3 || documentation!.isUnderage){    
                    await StatusStepProspection.create({ obs: true, comments: document.comments, idProspection: document.idProspection, idStatus: 12 }, { transaction: transactionProspection });
                    await StatusStepProspection.create({ obs: false, idProspection: document.idProspection, idStatus: 17 }, { transaction: transactionProspection });
                    await ProcessProspection.update({ idStatus: 17 }, { where: { idProspection: document.idProspection }, transaction: transactionProspection });
                }else{
                    await StatusStepProspection.create({ obs: true, comments: document.comments, idProspection: document.idProspection, idStatus: 12 }, { transaction: transactionProspection });
                    await StatusStepProspection.create({ obs: false, idProspection: document.idProspection, idStatus: 15 }, { transaction: transactionProspection });
                    await ProcessProspection.update({ idStatus: 15 }, { where: { idProspection: document.idProspection }, transaction: transactionProspection });
                }
            }else{
                throw new ProspectionError("Não foi possível realizar a validação. Validação está inválida!");
            }

            return document;
            
        } catch (error) {
            throw error;
        }

    }

    async createNewContract(contract: any, file: any, transactionProspection: Transaction) {

        try {

            const prospectionActual = await ProcessProspection.findOne({ attributes: ['renegotiation'], where: { idProspection: contract.idProspection }});

            if(file){
                const { filename: path } = file;
                var urlContract = path;
            }else{
                throw new ProspectionError('Falta anexar documentos!');
            }

            const contractExist = await ProspectionContract.findOne({where: {idProspection: contract.idProspection}})
            if(contractExist) {
                await ProspectionContract.update({ urlContract: urlContract, observation: contract.observation, isAdditiveTerm: false, annexType: contract.annexType, annexTypeObservation: contract.annexTypeObservation }, {where: {idProspection: contract.idProspection}, transaction: transactionProspection });
            } else {
                await ProspectionContract.create({ urlContract: urlContract, idProspection: contract.idProspection, observation: contract.observation, isAdditiveTerm: false, annexType: contract.annexType, annexTypeObservation: contract.annexTypeObservation }, { transaction: transactionProspection });
            }
            
            if(contract.isLegal == 'false'){
                if(prospectionActual?.renegotiation){
                    await StatusStepProspection.create({ obs: false, idProspection: contract.idProspection, idStatus: 18 }, { transaction: transactionProspection });
                    await ProcessProspection.update({ idStatus: 18 }, { where: { idProspection: contract.idProspection }, transaction: transactionProspection });
                }else{
                    await StatusStepProspection.create({ obs: false, idProspection: contract.idProspection, idStatus: 17 }, { transaction: transactionProspection });
                    await ProcessProspection.update({ idStatus: 17 }, { where: { idProspection: contract.idProspection }, transaction: transactionProspection });
                }
            }else{
                await StatusStepProspection.create({ obs: false, idProspection: contract.idProspection, idStatus: 25 }, { transaction: transactionProspection });
                await ProcessProspection.update({ idStatus: 25 }, { where: { idProspection: contract.idProspection }, transaction: transactionProspection });
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async createNewChecklistFile(contract: any, file: any, transactionProspection: Transaction) {

        try {

            const prospectionActual = await ProcessProspection.findOne({ attributes: ['renegotiation'], where: { idProspection: contract.idProspection }});

            if(file){
                const { filename: path } = file;
                var urlChecklist = path;
            }else{
                throw new ProspectionError('Falta anexar documentos!');
            }

            if(prospectionActual?.renegotiation){
                await StatusStepProspection.create({ obs: false, idProspection: contract.idProspection, idStatus: 18 }, { transaction: transactionProspection });
                await ProcessProspection.update({ idStatus: 18 }, { where: { idProspection: contract.idProspection }, transaction: transactionProspection });
            }else{
                await ProspectionChecklistFile.create({ urlChecklist: urlChecklist, idProspection: contract.idProspection }, { transaction: transactionProspection });
                await StatusStepProspection.create({ obs: false, idProspection: contract.idProspection, idStatus: 17 }, { transaction: transactionProspection });
                await ProcessProspection.update({ idStatus: 17 }, { where: { idProspection: contract.idProspection }, transaction: transactionProspection });
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async createProspectionFinancial(payment: any, idUser: number, transactionProspection: Transaction) {

        try {

            const typeInfluencer = await ProspectionWork.findOne({ attributes: ['idType'], where: { idProspection: payment.idProspection }});
            const documentation = await ProspectionDocumentation.findOne({ attributes: ['isUnderage'], where: { idProspection: payment.idProspection }});

            for (const index in payment.payments) {
                await ProspectionFinancial.create({ idProspection: payment.idProspection, datePayment: payment.payments[index], distraction: false, valuePayment: 0 }, { transaction: transactionProspection });
            }

            if(typeInfluencer!.idType === 3 || documentation?.isUnderage){
                await StatusStepProspection.create({ obs: false, idProspection: payment.idProspection, idStatus: 19 }, { transaction: transactionProspection });
                await ProcessProspection.update({ idStatus: 19 }, { where: { idProspection: payment.idProspection }, transaction: transactionProspection });
            }else{
                await StatusStepProspection.create({ obs: false, idProspection: payment.idProspection, idStatus: 20 }, { transaction: transactionProspection });
                await ProcessProspection.update({ idStatus: 20 }, { where: { idProspection: payment.idProspection }, transaction: transactionProspection });
                
            }
            const messageNotification = await notificationService.createMessage(payment.idProspection, 1, idUser)
            await notificationService.prospectionNotification(payment.idProspection, 3, 3, "Solicitação Aprovação dados de pagamento", messageNotification.aprovalPayment, transactionProspection)
            
            return;
            
        } catch (error) {
            throw error;
        }

    }

    async updateContract(contract: any, file: any, transactionProspection: Transaction) {

        try {

            if(file){
                const { filename: path } = file;
                var urlContract = path;
            }else{
                throw new ProspectionError('Falta anexar documentos!');
            }

            await ProspectionContract.update({ urlContract: urlContract, effectiveDate: contract.effectiveDate, useImageDate: contract.useImageDate, annexType: contract.annexType, annexTypeObservation: contract.annexType }, { where: { idProspection: contract.idProspection }, transaction: transactionProspection });
            if(contract.isLegal == 'false'){
                await StatusStepProspection.create({ obs: false, idProspection: contract.idProspection, idStatus: 20 }, { transaction: transactionProspection });
                await ProcessProspection.update({ idStatus: 20 }, { where: { idProspection: contract.idProspection }, transaction: transactionProspection });
            }else{
                await StatusStepProspection.create({ obs: false, idProspection: contract.idProspection, idStatus: 25 }, { transaction: transactionProspection });
                await ProcessProspection.update({ idStatus: 25 }, { where: { idProspection: contract.idProspection }, transaction: transactionProspection });
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async influencerApprovalContract(contract: any, transactionProspection: Transaction) {

        try {

            if(contract!.step === 27){
                await StatusStepProspection.create({ obs: true, idProspection: contract.idProspection, idStatus: 27, comments: contract?.comments }, { transaction: transactionProspection });
                await StatusStepProspection.create({ obs: false, idProspection: contract.idProspection, idStatus: 30 }, { transaction: transactionProspection });
                await ProcessProspection.update({ idStatus: 30 }, { where: { idProspection: contract.idProspection }, transaction: transactionProspection});
            }else{
                await StatusStepProspection.create({ obs: true, idProspection: contract.idProspection, idStatus: 28, comments: contract?.comments }, { transaction: transactionProspection });
                await StatusStepProspection.create({ obs: false, idProspection: contract.idProspection, idStatus: 29 }, { transaction: transactionProspection });
                await ProcessProspection.update({ idStatus: 29 }, { where: { idProspection: contract.idProspection }, transaction: transactionProspection});
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async sendInfluencerContract(idProspection: any, transactionProspection: Transaction) {

        try {

            await StatusStepProspection.create({ obs: false, idProspection: idProspection, idStatus: 26 }, { transaction: transactionProspection });
            await ProcessProspection.update({ idStatus: 26 }, { where: { idProspection: idProspection }, transaction: transactionProspection});

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async sendSignEmailContract(idProspection: any, transactionProspection: Transaction) {

        try {

            await StatusStepProspection.create({ obs: false, idProspection: idProspection, idStatus: 31 }, { transaction: transactionProspection });
            await ProcessProspection.update({ idStatus: 31 }, { where: { idProspection: idProspection }, transaction: transactionProspection});

            return;
            
        } catch (error) {
            throw error;
        }

    }

    // ******** routine of legal ********

    async getAllLegal(status: number){

        try {
            
            if(status === 0){
                var prospectionList = await prospectionRepository.getAllByLegal();
            }else{
                var prospectionList = await prospectionRepository.getAllByLegalByFilter(status);
            }
            
            return prospectionList;

        } catch (error) {
            throw error;
        }

    }

    async getErrorContract(idProspection: number){

        try {
            
            const errorContract = await StatusStepProspection.findOne({ attributes: ['comments'], where: { idProspection: idProspection, idStatus: 28 }, order: [['id', 'desc']]});
            if(!errorContract)
                throw new ProspectionError("Não foi possível encontrar o retorno do erro do contrato!");
            
            return { comments: errorContract.comments };

        } catch (error) {
            throw error;
        }

    }

    async validationApprovalContract(contract: any, transactionProspection: Transaction) {

        try {

            if(contract!.step === 21){
                await StatusStepProspection.create({ obs: false, idProspection: contract.idProspection, idStatus: 21 }, { transaction: transactionProspection });
                await StatusStepProspection.create({ obs: false, idProspection: contract.idProspection, idStatus: 25 }, { transaction: transactionProspection });
                await ProcessProspection.update({ idStatus: 25 }, { where: { idProspection: contract.idProspection }, transaction: transactionProspection});
                const messageNotification = await notificationService.createMessage(contract.idProspection, 2)
                await notificationService.prospectionNotification(contract.idProspection, 1, 2, "Contrato Aprovado", messageNotification.validateContract, transactionProspection )
            }else{
                await StatusStepProspection.create({ obs: true, idProspection: contract.idProspection, idStatus: 22, comments: contract?.comments }, { transaction: transactionProspection });
                await StatusStepProspection.create({ obs: false, idProspection: contract.idProspection, idStatus: 23 }, { transaction: transactionProspection });
                await ProcessProspection.update({ idStatus: 23 }, { where: { idProspection: contract.idProspection }, transaction: transactionProspection});
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async signatureApprovalContract(contract: any, idUser: number, file: any, transactionProspection: Transaction) {

        try {
                
            if(contract!.step == '33'){
                if(file){
                    const { filename: path } = file;
                    var urlContract = path;
                }else{
                    throw new ProspectionError('Falta anexar documentos!');
                }

                if(!contract?.effectiveDate || !contract?.useImageDate){
                    throw new ProspectionError('É necessário enviar a data de vigência e a de use de imagem do contrato!');
                }

                await ProspectionContract.update({ urlContract: urlContract, effectiveDate: contract.effectiveDate, useImageDate: contract.useImageDate }, { where: { idProspection: contract.idProspection }, transaction: transactionProspection });
                await StatusStepProspection.create({ obs: false, idProspection: contract.idProspection, idStatus: 33 }, { transaction: transactionProspection });
                await ProcessProspection.update({ idStatus: 33 }, { where: { idProspection: contract.idProspection }, transaction: transactionProspection});
                const idMonitoring = await Monitoring.create({ idProspection: contract.idProspection, idStatus: 1 }, { transaction: transactionProspection });
                const notificationMessage = await notificationService.createMessage(contract.idProspection, 1, idUser)
                await notificationService.prospectionNotification(contract.idProspection,1, 4, "Contrato assinado", notificationMessage.signatureContract, transactionProspection, idMonitoring)
            }else{
                await StatusStepProspection.create({ obs: true, idProspection: contract.idProspection, idStatus: 32, comments: contract?.comments }, { transaction: transactionProspection });
                await ProcessProspection.update({ idStatus: 32 }, { where: { idProspection: contract.idProspection }, transaction: transactionProspection});
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async changeUserProspection(prospection: any, transactionProspection: Transaction) {

        try {

            if(prospection.idUser === prospection.idUserToChange){
                throw new ProspectionError("Você está tentando mudar dois usuários iguais!");
            }

            const userProspectionList: any = await prospectionRepository.userActualProspection(prospection.idUser, prospection.idSquad);
            if(userProspectionList.length > 0){
                for (const index in userProspectionList) {
                    await ProspectionUserOther.create({ idProspection: userProspectionList[index].id, idUser: prospection.idUser }, { transaction: transactionProspection });
                    await ProspectionUserActual.update({ idUser: prospection.idUserToChange }, { where: { idProspection: userProspectionList[index].id }, transaction: transactionProspection});
                }
            }else {
                throw new ProspectionError("O usuário selecionado não possui prospecções em aberto!");
            }
            
            return;
            
        } catch (error) {
            throw error;
        }

    }

    async changeStatusProspection(prospection: any, transactionProspection: Transaction) {

        try {
            await ProcessProspection.update({idStatus: prospection.idStatusToChange},{where: {idProspection: prospection.idProspection}, transaction: transactionProspection})
            const nameStatusAtual = await StatusProspection.findOne({where: {id: prospection.idStatusAtual}})
            const nameStatusToChange = await StatusProspection.findOne({where: {id: prospection.idStatusToChange}})
            await ProspectionLogChangeStatus.create({idProspection: prospection.idProspection, description: `Status Prospecção ${prospection.idProspection} alterado de ${nameStatusAtual?.description} para ${nameStatusToChange?.description}`}, {transaction: transactionProspection} )
            
            return;
            
        } catch (error) {
            throw error;
        }

    }

    async getLogChangedStatusProspection(idProspection: number) {

        try {
            const changeStatusProspection = await prospectionRepository.getLogChangedStatusProspection(idProspection)
            
            return changeStatusProspection
            
        } catch (error) {
            throw error;
        }

    }

    // ******** routine of financial ********

    async getPaymentsAvailable(month: string) {

        try {

            if(month == '0'){
                const d = new Date();
                var monthDate = d.getMonth() + 1;
                if(monthDate < 10){
                    var monthActual = '0' + monthDate;
                }else{
                    var monthActual = String(monthDate);
                }
            }else{
                if(month.length < 2){
                    var monthActual = '0' + month;
                }else{
                    var monthActual = month;
                }
            }

            const payments: any[] = await prospectionRepository.getPaymentsFinancial(monthActual);

            if(payments.length > 0){

                const dateObj = new Date();
                var monthToday = dateObj.getUTCMonth() + 1;
                var day = dateObj.getUTCDate();
                const year = dateObj.getUTCFullYear();

                if(monthToday < 10){
                    var monthNow = '0' + monthToday;
                }else{
                    var monthNow = String(monthToday);
                }

                if(day < 10){
                    var dayActual = '0' + day;
                }else{
                    var dayActual = String(day);
                }

                const dateToday = year + '-' + monthNow + '-' + dayActual;
                const paymentFormatted = payments.map((element) => {

                    if(element.datePayment < dateToday){
                        element.isLate = true;
                    }else{
                        element.isLate = false;
                    }

                    return element;

                });

                return paymentFormatted;
            }else{
                return payments;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async getPaymentsPaid(month: string) {

        try {

            if(month == '0'){
                const d = new Date();
                var monthDate = d.getMonth() + 1;
                if(monthDate < 10){
                    var monthActual = '0' + monthDate;
                }else{
                    var monthActual = String(monthDate);
                }
            }else{
                if(month.length < 2){
                    var monthActual = '0' + month;
                }else{
                    var monthActual = month;
                }
            }

           return await prospectionRepository.getPaymentsPaid(monthActual);

            
        } catch (error) {
            throw error;
        }

    }

    async getPaymentsPaidInfluencer(month: string, idUser: number) {

        try {

            if(month == '0'){
                const d = new Date();
                var monthDate = d.getMonth() + 1;
                if(monthDate < 10){
                    var monthActual = '0' + monthDate;
                }else{
                    var monthActual = String(monthDate);
                }
            }else{
                if(month.length < 2){
                    var monthActual = '0' + month;
                }else{
                    var monthActual = month;
                }
            }

            const isDirector: boolean = await authService.validateUserPolicy(idUser, 'influencer', 1);
            const isTeamLeader: boolean = await authService.validateUserPolicy(idUser, 'influencer', 2);
            if(isDirector){
                return await prospectionRepository.getPaymentsPaidInfluencer(monthActual, idUser, true);
            }else if(isTeamLeader) {
                return await prospectionRepository.getPaymentsPaidInfluencer(monthActual, idUser, false);
            } else {
                return await prospectionRepository.getPaymentsPaidInfluencerAnalyst(monthActual, idUser);
            }
            
        } catch (error) {
            throw error;
        }

    }

    async detailsPayments(idProspection: number) {

        try {

            return await prospectionRepository.detailsPayments(idProspection);
            
        } catch (error) {
            throw error;
        }

    }

    async getPaymensLog(idProspectionFinancial: number) {

        try {

            return await ProspectionFinancialLog.findAll({ attributes: ['comment'], where: { idProspectionFinancial: idProspectionFinancial }});
            
        } catch (error) {
            throw error;
        }

    }

    async paymentRequest(paymentRequest: any) {

        try {

            const payment = await ProspectionFinancialRequest.findOne({ where: { idProspectionFinancial: paymentRequest.idPayment }});
            if(payment) throw new ProspectionError("Esse pagamento já foi solicitado!");
            
            await ProspectionFinancialRequest.create({ idProspectionFinancial: paymentRequest.idPayment });

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async getPaymentRequest() {

        try {

            return await prospectionRepository.getPaymentsRequest();
            
        } catch (error) {
            throw error;
        }

    }

    async getPaymentRequestTeamLeader(idUser: number) {

        try {

            const isDirector: boolean = await authService.validateUserPolicy(idUser, 'influencer', 1);
            const isTeamLeader: boolean = await authService.validateUserPolicy(idUser, 'influencer', 2);
            if(isDirector){
                return await prospectionRepository.getPaymentsRequestTeamLeader(idUser, true);
            }else if(isTeamLeader) {
                return await prospectionRepository.getPaymentsRequestTeamLeader(idUser, false);
            } else {
                return await prospectionRepository.getPaymentsRequestAnalyst(idUser);
            }
            
        } catch (error) {
            throw error;
        }

    }

    async confirmPayment(paymentRequest: any, transaction: Transaction) {

        try {

            const payment  = await ProspectionFinancialRequest.findOne({ attributes:['idProspectionFinancial', 'confirmTlMonitoring', 'confirmTlProspection'], where: { id: paymentRequest.idPaymentRequest }});
            if(!payment) throw new ProspectionError("Solicitação não existe!");

            if(!payment.confirmTlMonitoring || !payment.confirmTlProspection) throw new ProspectionError("Para a realização do pagamento precisa da confirmação do monitoramento e prospecção!");

            const paymentFinancial = await ProspectionFinancial.findOne({ where: { id: payment.idProspectionFinancial }});
            const prospectionWork = await ProspectionWork.findOne({ where: { idProspection: paymentFinancial?.idProspection }});

            await ProspectionFinancial.update({ confirmPayment: '1', valuePayment: prospectionWork?.mediaValue }, { where: { id: payment.idProspectionFinancial }, transaction: transaction });
            await ProspectionFinancialRequest.destroy({ where: { id: paymentRequest.idPaymentRequest }, transaction: transaction });

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async approvalPayment(payment: any, idUser: number, transaction: Transaction) {

        try {

            const paymentRequest = await ProspectionFinancialRequest.findOne({ where: { id: payment.idPaymentRequest }});
            if(!paymentRequest) throw new ProspectionError("Não foi posível encontrar o pagamento solcitado!");

            const isDirector: boolean = await authService.validateUserPolicy(idUser, 'influencer', 1);
            if(isDirector){
                if(paymentRequest.confirmTlMonitoring != null && paymentRequest.confirmTlProspection != null) throw new ProspectionError("O pagamento já foi solicitado pelos Team Leaders!");

                if(payment.approval){
                    await ProspectionFinancialRequest.update({ confirmTlMonitoring: true, confirmTlProspection: true }, { where:{ id: payment.idPaymentRequest }, transaction: transaction });
                }else{
                    await ProspectionFinancialRequest.destroy({ where: { id: payment.idPaymentRequest }, transaction: transaction });
                    await ProspectionFinancialLog.create({ idProspectionFinancial: payment.idPayment, comment: payment.comment }, { transaction: transaction });
                }

            }else {
                const paymentFinancial = await ProspectionFinancial.findOne({ where: { id: payment.idPayment }});
                if(!paymentFinancial) throw new ProspectionError("Não foi posível encontrar o pagamento solcitado!");

                const prospection = await Prospection.findOne({ where: { id: paymentFinancial.idProspection }});
                const squad = await Squad.findOne({ where: { id: prospection?.idSquad }});

                if(squad?.idTeamLeader == idUser){
                    if(paymentRequest.confirmTlProspection != null) throw new ProspectionError("O pagamento já foi solicitado!");
                    if(payment.approval){
                        await ProspectionFinancialRequest.update({ confirmTlProspection: true }, { where:{ id: payment.idPaymentRequest }, transaction: transaction });
                    }else{
                        await ProspectionFinancialRequest.destroy({ where: { id: payment.idPaymentRequest }, transaction: transaction });
                        await ProspectionFinancialLog.create({ idProspectionFinancial: payment.idPayment, comment: payment.comment }, { transaction: transaction });
                    }
                }else if(squad?.idTeamLeaderMonitoring == idUser){
                    if(paymentRequest.confirmTlMonitoring != null) throw new ProspectionError("O pagamento já foi solicitado!");
                    if(payment.approval){
                        await ProspectionFinancialRequest.update({ confirmTlMonitoring: true }, { where:{ id: payment.idPaymentRequest }, transaction: transaction });
                    }else{
                        await ProspectionFinancialRequest.destroy({ where: { id: payment.idPaymentRequest }, transaction: transaction });
                        await ProspectionFinancialLog.create({ idProspectionFinancial: payment.idPayment, comment: payment.comment }, { transaction: transaction });
                    }
                }else{
                    throw new ProspectionError("Usuário não tem a permissão para acessar esse pagamento!");
                }
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async getNickNameInfluencer(idProspection: number) {

        try {

            const nickname = await prospectionRepository.getNickNameInfluencer(idProspection)
            return nickname

        }
        catch (error) {
            throw error
        }
    }

}

export default new ProspectionService();