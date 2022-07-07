import { Transaction } from 'sequelize/types';
import ReasonAdditiveTerm from "../models/reason_additive_term_prospection_influencer"
import AdditiveTerm from "../models/additive_term"
import MonitoringError from "../../../../../shared/exceptions/monitoring/monitoring_exception"
import AdditiveTermDocumentation from "../models/additive_term_documentation"
import prospectionAdditiveTermRepository from "../../repository/prospection_additive_term_repository"
import ProspectionContract from "../models/prospection_contract_influencer"
import Influencer from '../../../influencer_client/shared/models/influencer';
import ProspectionChecklist from '../models/prospection_checklist';
import ProspectionChecklistSocial from '../models/prospection_checklist_social';
import ProspectionFinancial from '../models/prospection_financial';
import authService from '../../../../auth/shared/services/auth_service';


class ProspectionAdditiveTermService {

    // ==== GET ====

    async getReasonAdditiveTerm() {

        try {
            const reason = await ReasonAdditiveTerm.findAll({attributes: ['id', 'name']})
            return reason
        }
        catch (error) {
            throw error
        }
    }

    async getAdditiveTerm(idUser: number) {

        
        try {

            const isDirector: boolean = await authService.validateUserPolicy(idUser, 'influencer', 1)
            const isTeamLeader: boolean = await authService.validateUserPolicy(idUser, 'influencer', 2)
            
            if( isDirector || isTeamLeader ) {
                const additiveTerm = await prospectionAdditiveTermRepository.getAdditiveTerm()
                return additiveTerm

            } else {
            
                const additiveTerm = await prospectionAdditiveTermRepository.getAdditiveTermByUserAnalist(idUser)
                return additiveTerm
            }
            
        }
        catch (error) {
            throw error
        }
    }

    async getAllAdditiveTermByLegal() {

        
        try {
            const additiveTerm: any = await prospectionAdditiveTermRepository.getAdditiveTerm()

            if(additiveTerm.length > 0) {
                var additiveTermLegal: any = []
                for(const index in additiveTerm) {
                    const contractProspection = await ProspectionContract.findOne({attributes: ['urlContract'], where: {idProspection: additiveTerm[index].idProspection}})
                    additiveTermLegal.push({
                        "idAdditiveTerm": additiveTerm[index].idAdditiveTerm,
                        "idProspection": additiveTerm[index].idProspection,
                        "influencerName": additiveTerm[index].influencerName,
                        "instagramName": additiveTerm[index].instagramName,
                        "reason": additiveTerm[index].reason,
                        "idStatus": additiveTerm[index].idStatus,
                        "statusName": additiveTerm[index].statusName,
                        "description": additiveTerm[index].description,
                        "observation": additiveTerm[index].observation,
                        "urlFileSend": additiveTerm[index].urlFileSend,
                        "contractProspection": contractProspection?.urlContract

                    })
                }
            }
            return additiveTermLegal
            
        }
        catch (error) {
            throw error
        }
    }

    async getAdditiveTermDocumentation(idProspection: number) {

        try {
            
            const additiveTermDocumentation: any = await prospectionAdditiveTermRepository.getAdditiveTermDocumentation(idProspection)
            
            var additiveTerm = []

            for (let index = 0; additiveTermDocumentation.length > index; index++) {
                additiveTerm.push(additiveTermDocumentation[index].urlAdditiveTerm)
            }
            return additiveTerm
            
        }
        catch (error) {
            throw error
        }
    }

    // ==== POST ====

    async createAdditiveTerm(additiveTerm: any, file: any, transactionAdditiveTerm: Transaction) {

        try {

            let pathUrlFileSend
      
            if(file){
                const { filename: path } = file;
                pathUrlFileSend = path;
            }else{
                throw new MonitoringError('Falta anexar Arquivo!');
            }
            await AdditiveTerm.create({idProspection: additiveTerm.idProspection, idReasonAdditiveTerm: additiveTerm.idReasonAdditiveTerm, idStatusAdditiveTerm: 2, description: additiveTerm.description, urlFileSend: pathUrlFileSend}, {transaction: transactionAdditiveTerm})
            return 
        }
        catch (error) {
            throw error
        }
    }

    async uploadAdditiveTerm(additiveTerm: any, file: any, transactionAdditiveTerm: Transaction) {

        try {

            let pathUrlFileSend;
      
            if(file){
                const { filename: path } = file;
                pathUrlFileSend = path;
            }else{
                throw new MonitoringError('Falta anexar Arquivo!');
            }
            await AdditiveTermDocumentation.create({idAdditiveTerm: additiveTerm.idAdditiveTerm, url: pathUrlFileSend}, {transaction: transactionAdditiveTerm})
            await AdditiveTerm.update({idStatusAdditiveTerm: 6}, {where: {id: additiveTerm.idAdditiveTerm}, transaction: transactionAdditiveTerm})
            const idProspectionAdditiveTerm = await AdditiveTerm.findOne({where: {id: additiveTerm.idAdditiveTerm}})
            await ProspectionContract.update({isAdditiveTerm: true}, {where: {idProspection:idProspectionAdditiveTerm?.idProspection}, transaction: transactionAdditiveTerm})
            return 
        }
        catch (error) {
            throw error
        }
    }


    // ==== PUT ====

    async validateLegalAdditiveTerm(additiveTerm: any, transactionAdditiveTerm: Transaction) {

        try {
            if(additiveTerm.step == 0) {
                await AdditiveTerm.update({idStatusAdditiveTerm: 4},{where: {id: additiveTerm.idAdditiveTerm}, transaction: transactionAdditiveTerm})
            } else {
                await AdditiveTerm.update({idStatusAdditiveTerm: 5},{where: {id: additiveTerm.idAdditiveTerm}, transaction: transactionAdditiveTerm})
            }
            
            return 
        }
        catch (error) {
            throw error
        }
    }

    async validateMonitoringAdditiveTerm(additiveTerm: any, transactionAdditiveTerm: Transaction) {

        try {
            await AdditiveTerm.update({idStatusAdditiveTerm: 3},{where: {id: additiveTerm.idAdditiveTerm}, transaction: transactionAdditiveTerm})
            return 
        }
        catch (error) {
            throw error
        }
    }

    async updateInstagramNameInfluencer (influencer: any, transactionAdditiveTerm: Transaction) {

        try {
            await Influencer.update({instagramName: influencer.instagramName}, {where: {id: influencer.idInfluencer}, transaction: transactionAdditiveTerm})
            return
        }
        catch (error) {
            throw error
        }
    }

    async updateChecklist(checklist: any, transactionProspection: Transaction) {

        try {
            await ProspectionChecklist.update({ nickname: checklist.nickname, nameFull: checklist.fullName, class: checklist.class, fallowers: checklist.fallowers, advice: checklist.advice, 
                coupon: checklist.coupon, birthday: checklist.birthday},{where: { idProspection: checklist.idProspection},transaction: transactionProspection})
            return
        }
        catch (error) {
            throw error
        }
    }

    async updateChecklistSocial(checklistSocial: any, transactionProspection: Transaction) {

        try {
            
            await ProspectionChecklistSocial.update({bowlSend: checklistSocial.bowlSend, observation: checklistSocial.observation, storie: checklistSocial.storie, storieValue: checklistSocial.storieValue, photo: checklistSocial.photo, photoValue: checklistSocial.photoValue, photoFeedValue: checklistSocial.photoFeedValue, photoFeed: checklistSocial.photoFeed,
                video: checklistSocial.video, videoValue: checklistSocial.videoValue, videoFeed: checklistSocial.videoFeed, videoFeedValue: checklistSocial.videoFeedValue, tiktok: checklistSocial.tiktok, tiktokValue: checklistSocial.tiktokValue,
                tiktokFeed: checklistSocial.tiktokFeed, tiktokFeedValue: checklistSocial.tiktokFeedValue, igtv: checklistSocial.igtv, igtvValue: checklistSocial.igtvValue, igtvFeed: checklistSocial.igtvFeed, igtvFeedValue: checklistSocial.igtvFeedValue,
                live: checklistSocial.live, liveValue: checklistSocial.liveValue, liveSave: checklistSocial.liveSave, liveSaveValue: checklistSocial.liveSaveValue, youtube: checklistSocial.youtube, youtubeValue: checklistSocial.youtubeValue,
                youtubeFeed: checklistSocial.youtubeFeed, youtubeFeedValue: checklistSocial.youtubeFeedValue, brandExclusive: checklistSocial.brandExclusive, segmentExclusive: checklistSocial.segmentExclusive, allowBoost: checklistSocial.allowBoost, segmentExclusiveValue: checklistSocial.segmentExclusiveValue,
                idProspection: checklistSocial.idProspection, commentBoost: checklistSocial.commentBoost}, {where: {idProspection: checklistSocial.idProspection}, transaction: transactionProspection}) // Verificar alteração do idProspection
            return
        }
        catch(error) {
            throw error;
        }
    }

    async updateProspectionFinancial(payment: any, transactionProspection: Transaction) {

        try {
            for (const index in payment.payments){
                await ProspectionFinancial.update({ datePayment: payment.payments[index].datePayment}, {where: {id: payment.payments[index].idPayment}, transaction: transactionProspection})
            }
            return 
        }
        catch(error) {
            throw error
        }
    }

}

export default new ProspectionAdditiveTermService()