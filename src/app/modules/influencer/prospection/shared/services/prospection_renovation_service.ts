import ProspectionError from "../../../../../shared/exceptions/prospection/prospection_exception";
import ProspectionRenovation from "../models/prospection_renovation";
import prospectionRenovationRepository from "../../repository/prospection_renovation_repository";
import ProspectionWork from "../models/prospection_work";
import ProspectionDocumentation from "../models/prospection_documentation";
import authService from "../../../../auth/shared/services/auth_service";
import { Transaction } from "sequelize/types";
import ProcessProspection from "../models/process_prospection";
import StatusStepProspection from "../models/status_step_prospection";
import Prospection from "../models/prospection";
import UserCodInfluencer from "../../../../profile/user/shared/models/user_cod_influencer";
import ProspectionUserActual from "../models/prospection_user_actual";
import ProspectionInformation from "../models/prospection_information";
import ProspectionDocumentationContractor from "../models/prospection_documentation_contractor";
import ProspectionDocumentationContractorFiles from "../models/prospection_documentation_contractor_files";
import ProspectionDocumentationIntervening from "../models/prospection_documentation_intervening";
import ProspectionDocumentationInterveningFiles from "../models/prospection_documentation_intervening_files";
import ProspectionChecklistAddress from "../models/prospection_checklist_address";
import ProspectionChecklistBank from "../models/prospection_checklist_bank_influencer";
import ProspectionChecklist from "../models/prospection_checklist";
import ProspectionChecklistSocial from "../models/prospection_checklist_social";

class ProspectionRenovationService {

    async createRenovation(renovation: any, file: any){

        try {

            if(file) {
                var { filename: path } = file;
            }else{
                throw new ProspectionError('O relatório precisa ser enviado!');
            }
            
            if(await ProspectionRenovation.findOne({ where: { idProspection: renovation.idProspection }}))
                throw new ProspectionError('Esse contrato já posssui uma renovação existente!');

            await ProspectionRenovation.create({ url: path, comment: renovation.comment, idStatusRenovation: 1, idProspection: renovation.idProspection });

            return;
            
        } catch (error) {
            throw error;
        }
    }

    async getAll(idUser: number){

        try {

            const isDirector: boolean = await authService.validateUserPolicy(idUser, 'influencer', 1);
            if(isDirector){
                return await prospectionRenovationRepository.getAll();
            }

            const isTeamLeader: boolean = await authService.validateUserPolicy(idUser, 'influencer', 2);
            if(isTeamLeader){
                return await prospectionRenovationRepository.getAllByTeamLeader(idUser);
            }

            const isUserInfluencer: boolean = await authService.validateUserPolicy(idUser, 'influencer', 0);
            if(isUserInfluencer){
                return await prospectionRenovationRepository.getAllByUser(idUser);
            }

            const isUserLegal: boolean = await authService.validateUserPolicy(idUser, 'legal', 0);
            if(isUserLegal){
                return await prospectionRenovationRepository.getAllByLegal();
            }

        } catch (error) {
            throw error;
        }

    }

    async approvalRenovation(renovation: any, idUser: number, transaction: Transaction){

        try {

            const isUserInfluencer: boolean = await authService.validateUserPolicy(idUser, 'influencer', 0);
            if(!isUserInfluencer) throw new ProspectionError('O usuário não é um analista para a aprovação!');

            const prospectionRenovation = await ProspectionRenovation.findOne({ where:{ id: renovation.idRenovation}});

            if(renovation.step === 3){
                await ProspectionRenovation.update({ idStatusRenovation: 4, comment: renovation.comment }, { where: { idProspection: prospectionRenovation?.idProspection }, transaction: transaction });
            }else{
                const idNewProspection: any = await this.createCopyTableProspectionToRenovation(prospectionRenovation!.idProspection, idUser, transaction);
                
                await this.createCopyTableProspectionUntilNegociationToRenovation(prospectionRenovation!.idProspection, Number(idNewProspection), transaction);
                await this.createCopyTableProspectionDocumentationToRenovation(prospectionRenovation!.idProspection, Number(idNewProspection), transaction);
                await this.createCopyTableProspectionChecklistToRenovation(prospectionRenovation!.idProspection, Number(idNewProspection), transaction);

                await ProspectionRenovation.update({ idStatusRenovation: 4 }, { where: { id: renovation.idRenovation }, transaction: transaction });
            }
            
        } catch (error) {
            throw error;
        }
    }

    async createCopyTableProspectionToRenovation(idProspection: number, idUser: number, transaction: Transaction){

        try {

            const userCod = await UserCodInfluencer.findOne({ where: { idUser: idUser }});

            const prospectionCopy = await Prospection.findOne({ where: { id: idProspection }});
            const prospectionCreated = await Prospection.create({ cod: '', idInfluencer: prospectionCopy!.idInfluencer, idSquad: prospectionCopy!.idSquad }, { transaction: transaction });

            const codProspeccao = userCod?.cod.toLocaleUpperCase() + "_R" + prospectionCreated.id;
            await Prospection.update({ cod: codProspeccao}, { where: { id: prospectionCreated.id }, transaction: transaction});

            await ProspectionUserActual.create({ idProspection: prospectionCreated.id, idUser: idUser}, { transaction: transaction });
            await ProcessProspection.create({ idProspection: prospectionCreated.id, idStatus: 3, renegotiation: true, distraction: false }, { transaction: transaction });
            await StatusStepProspection.create({ idProspection: prospectionCreated.id, idStatus: 1, obs: false }, { transaction: transaction });
            await StatusStepProspection.create({ idProspection: prospectionCreated.id, idStatus: 2, obs: false }, { transaction: transaction });
            await StatusStepProspection.create({ idProspection: prospectionCreated.id, idStatus: 3, obs: false }, { transaction: transaction });


            return prospectionCreated.id;
            
        } catch (error) {
            throw error;
        }
    }

    async createCopyTableProspectionUntilNegociationToRenovation(idProspection: number, idProspectionRenovation: number, transaction: Transaction){

        try {

            const prospectionInformation = await ProspectionInformation.findOne({ where: { idProspection: idProspection }});
            const prospectionWork = await ProspectionWork.findOne({ where: { idProspection: idProspection }});

            await ProspectionInformation.create({ 
                public: prospectionInformation!.public, audience: prospectionInformation!.audience, following: prospectionInformation!.following, cel: prospectionInformation!.cel, 
                idLocation: prospectionInformation!.idLocation, idAge: prospectionInformation!.idAge, idProspection: idProspectionRenovation
            }, { transaction: transaction });

            await ProspectionWork.create({ 
                initialDate: prospectionWork!.initialDate, finalDate: prospectionWork!.finalDate, contractPeriod: prospectionWork!.contractPeriod,
                mediaAudience: prospectionWork!.mediaAudience, value: prospectionWork!.value, mediaValue: prospectionWork!.mediaAudience, 
                job: prospectionWork!.job, comments: prospectionWork?.comments, additionalImageUse: prospectionWork!.additionalImageUse,
                additionalPeriod: prospectionWork?.additionalPeriod, additionalPeriodValue: prospectionWork?.additionalPeriodValue, idProspection: idProspectionRenovation,
                idType: prospectionWork!.idType, idExclusivity: prospectionWork!.idExclusivity
            }, { transaction: transaction });
            
        } catch (error) {
            throw error;
        }
    }

    async createCopyTableProspectionDocumentationToRenovation(idProspection: number, idProspectionRenovation: number, transaction: Transaction){

        try {

            const prospectionDocumentation = await ProspectionDocumentation.findOne({ where: { idProspection: idProspection }});
            const prospectionContractor = await ProspectionDocumentationContractor.findAll({ where: { idDocumentation: prospectionDocumentation?.id }});
            const newDocumentation =  await ProspectionDocumentation.create({ isUnderage: prospectionDocumentation!.isUnderage, idProspection: idProspectionRenovation, token: prospectionDocumentation!.token }, { transaction: transaction });
            
            for (const index in prospectionContractor) {
                const newDocumentationContractor =  await ProspectionDocumentationContractor.create({
                    name: prospectionContractor[index]!.name, rg: prospectionContractor[index]!.rg,cpf: prospectionContractor[index]!.cpf, 
                    nacionality: prospectionContractor[index]!.nacionality, civilState: prospectionContractor[index]?.civilState,
                    job: prospectionContractor[index]?.job, tel: prospectionContractor[index]?.tel, email: prospectionContractor[index]!.email, isUnderage: prospectionContractor[index]!.isUnderage,
                    idDocumentation: newDocumentation.id
                }, { transaction: transaction });

                const prospectionContractorFile = await ProspectionDocumentationContractorFiles.findAll({ where: { idDocumentationContractor: prospectionContractor[index].id }});
                for (const index2 in prospectionContractorFile) {
                    await ProspectionDocumentationContractorFiles.create({ 
                        url: prospectionContractorFile[index2].url, subtitle: prospectionContractorFile[index2].subtitle, idDocumentationContractor: newDocumentationContractor.id
                    }, { transaction: transaction });
                }
            }

            const prospectionIntervening = await ProspectionDocumentationIntervening.findAll({ where: { idDocumentation: prospectionDocumentation?.id }});
            for (const index in prospectionIntervening) {
                const newDocumentationIntervening =  await ProspectionDocumentationIntervening.create({
                    corporateName: prospectionIntervening[index]!.corporateName, email: prospectionIntervening[index]!.email, tel: prospectionIntervening[index]!.tel,
                    idDocumentation: newDocumentation.id
                }, { transaction: transaction });

                const prospectionInterveningFile = await ProspectionDocumentationInterveningFiles.findAll({ where: { idDocumentationIntervening: prospectionIntervening[index].id }});
                for (const index2 in prospectionInterveningFile) {
                    await ProspectionDocumentationInterveningFiles.create({ 
                        url: prospectionInterveningFile[index2].url, subtitle: prospectionInterveningFile[index2].subtitle, idDocumentationIntervening: newDocumentationIntervening.id
                    }, { transaction: transaction });
                }
            }
            
        } catch (error) {
            throw error;
        }
    }

    async createCopyTableProspectionChecklistToRenovation(idProspection: number, idProspectionRenovation: number, transaction: Transaction){

        try {

            const prospectionAddress = await ProspectionChecklistAddress.findOne({ where: { idProspection: idProspection }});
            await ProspectionChecklistAddress.create({ 
                cep: prospectionAddress?.cep, address: prospectionAddress?.address, city: prospectionAddress!.city, district: prospectionAddress?.district,
                uf: prospectionAddress?.uf, number: prospectionAddress?.number, complement: prospectionAddress?.complement, idProspection: idProspectionRenovation
            }, { transaction: transaction });

            const prospectionBank = await ProspectionChecklistBank.findAll({ where :{ idProspection: idProspection }});
            for(const index in prospectionBank){
                await ProspectionChecklistBank.create({
                    percentage: prospectionBank[index].percentage, mainName: prospectionBank[index].mainName, cpfCnpj: prospectionBank[index].cpfCnpj,
                    bank: prospectionBank[index].bank, agency: prospectionBank[index].agency, account: prospectionBank[index].account, typePix: prospectionBank[index].typePix,
                    pix: prospectionBank[index].pix, receiptBank: prospectionBank[index].receiptBank, urlBank: prospectionBank[index].urlBank, idProspection: idProspectionRenovation
                }, { transaction: transaction });
            }

            const prospectionChecklist = await ProspectionChecklist.findOne({ where: { idProspection: idProspection }});
            await ProspectionChecklist.create({
                nickname: prospectionChecklist!.nickname, nameFull: prospectionChecklist!.nameFull, class: prospectionChecklist!.class, fallowers: prospectionChecklist!.fallowers,
                advice: prospectionChecklist!.advice, coupon: prospectionChecklist!.coupon, birthday: prospectionChecklist!.birthday, idProspection: idProspectionRenovation
            }, { transaction: transaction });

            const prospectionChecklistSocial = await ProspectionChecklistSocial.findOne({ where: { idProspection: idProspection }});
            await ProspectionChecklistSocial.create({
                bowlSend: prospectionChecklistSocial!.bowlSend, observation: prospectionChecklistSocial?.observation ?? '', paidPartnership: prospectionChecklistSocial!.paidPartnership, paidPartnershipValue: prospectionChecklistSocial?.paidPartnershipValue, storie: prospectionChecklistSocial!.storie,
                storieValue: prospectionChecklistSocial!.storie, personalStoriePosted: prospectionChecklistSocial!.personalStoriePosted, photo: prospectionChecklistSocial!.photo, photoValue: prospectionChecklistSocial!.photoValue,
                photoFeed: prospectionChecklistSocial!.photoFeed, photoFeedValue: prospectionChecklistSocial!.photoFeedValue, receivedPhotoDate: prospectionChecklistSocial!.receivedPhotoDate, postPhotoFeedDate: prospectionChecklistSocial!.postPhotoFeedDate, postPhoto: prospectionChecklistSocial!.postPhoto, video: prospectionChecklistSocial!.video,
                videoValue: prospectionChecklistSocial!.videoValue, videoFeed: prospectionChecklistSocial!.videoFeed, videoFeedValue: prospectionChecklistSocial!.videoFeedValue, videoDuration: prospectionChecklistSocial!.videoDuration, videoFormat: prospectionChecklistSocial!.videoFormat, videoUploadDate: prospectionChecklistSocial!.videoUploadDate,
                receivedVideoDate: prospectionChecklistSocial!.receivedVideoDate, postVideo: prospectionChecklistSocial!.postVideo, postVideoDate: prospectionChecklistSocial!.postVideoDate, canPublishInPublicityDay: prospectionChecklistSocial!.canPublishInPublicityDay, observationOtherPublicity: prospectionChecklistSocial?.observationOtherPublicity,
                tiktok: prospectionChecklistSocial!.tiktok, tiktokValue: prospectionChecklistSocial!.tiktokValue, tiktokFeed: prospectionChecklistSocial!.tiktokFeed,
                tiktokFeedValue: prospectionChecklistSocial!.tiktokFeedValue, igtv: prospectionChecklistSocial!.igtv, igtvValue: prospectionChecklistSocial!.igtvValue,
                igtvFeed: prospectionChecklistSocial!.igtvFeed, igtvFeedValue: prospectionChecklistSocial!.igtvFeedValue, live: prospectionChecklistSocial!.live,
                liveValue: prospectionChecklistSocial!.liveValue, liveSave: prospectionChecklistSocial!.liveSave, liveSaveValue: prospectionChecklistSocial!.liveSaveValue,
                youtube: prospectionChecklistSocial!.youtube, youtubeValue: prospectionChecklistSocial!.youtubeValue, youtubeFeed: prospectionChecklistSocial!.youtubeFeed,
                youtubeFeedValue: prospectionChecklistSocial!.youtubeFeedValue, brandExclusive: prospectionChecklistSocial!.brandExclusive, segmentExclusive: prospectionChecklistSocial!.segmentExclusive,
                segmentExclusiveValue: prospectionChecklistSocial!.segmentExclusiveValue, allowBoost: prospectionChecklistSocial!.allowBoost, commentBoost: prospectionChecklistSocial?.commentBoost,
                valueUseImage: prospectionChecklistSocial!.valueUseImage, commentChecklist: prospectionChecklistSocial!.commentChecklist, additionalImageUse: prospectionChecklistSocial!.additionalImageUse,
                additionalPeriod: prospectionChecklistSocial?.additionalPeriod, additionalPeriodValue: prospectionChecklistSocial?.additionalPeriodValue,idProspection: idProspectionRenovation 
            }, { transaction: transaction });
            
        } catch (error) {
            throw error;
        }
    }

}

export default new ProspectionRenovationService();