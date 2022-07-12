import AuthConfig  from '../../../../../../config/auth';
import jwt from 'jsonwebtoken';
import { Transaction } from 'sequelize/types';
import MonitoringError from "../../../../../shared/exceptions/monitoring/monitoring_exception";
import authService from "../../../../auth/shared/services/auth_service";
import User from '../../../../profile/user/shared/models/user';
import Prospection from '../../../prospection/shared/models/prospection';
import monitoringRepository from "../../repository/monitoring_repository";
import EvaluationPublicationMonitoring from '../models/evaluation_publication_monitoring';
import Monitoring from "../models/monitoring";
import MonitoringRoadmap from '../models/monitoring_roadmap';
import MonitoringRoadmapWording from '../models/monitoring_roadmap_wording';
import MonitoringUserActual from "../models/monitoring_user_actual";
import PublicationLog from '../models/publication_log';
import PublicationMonitoring from '../models/publication_monitoring';
import PublicationPhoto from '../models/publication_photo';
import PublicationStories from '../models/publication_stories';
import PublicationVideo from '../models/publication_video';
import StatusPublicationMonitoring from '../models/status_publication_monitoring';
import MonitoringTokenRoadmap from '../models/monitoring_token_roadmap';
import AuthError from '../../../../../shared/exceptions/auth/auth_exception';
import MonitoringRoadmapMaterial from '../models/monitoring_roadmap_material';
import ProspectionInformation from '../../../prospection/shared/models/prospection_information';
import notificationService from '../../../../notification/shared/services/notification_service';
import ProspectionChecklist from '../../../prospection/shared/models/prospection_checklist';

var Sequelize = require('sequelize');
const Op = Sequelize.Op;

class MonitoringService {

    async getAllMonitoring(idUser: number, idSquad: number){

        try {

            const useIsDirector = await authService.validateUserPolicy(idUser, 'influencer', 1);
            if(useIsDirector){
                const monitoringList = await monitoringRepository.getAllMonitoring(idSquad);
                return await this.returnChangeProductMonitoring(monitoringList);
            }

            const useIsTeamLeader = await authService.validateTypeTeamLeaderInfluencer(idUser, idSquad, 2);
            if(useIsTeamLeader){
                const monitoringList = await monitoringRepository.getAllMonitoring(idSquad);
                return await this.returnChangeProductMonitoring(monitoringList);
            }

            const monitoringList = await monitoringRepository.getAllMonitoringByUser(idSquad, idUser);
            return await this.returnChangeProductMonitoring(monitoringList);
            
        } catch (error) {
            throw error;
        }

    }

    async getProductsByMonitoring(idProspection: number){

        try {

            const productsList: any = await monitoringRepository.getProductsByProspection(idProspection);
            if(productsList.length > 0){
                let productsName = '';
                for (const index in productsList) {
                    if(Number(index) === (productsList.length - 1)){
                        productsName += `${productsList[index].name}`;
                    }else{
                        productsName += `${productsList[index].name}/`;
                    }
                }
                return productsName;
            }else{
                return '';
            }
            
        } catch (error) {
            throw error; 
        }

    }

    async returnChangeProductMonitoring(monitoringList: any){

        var monitoringListChange = [];
        for (const index in monitoringList) {
            monitoringListChange.push({
                id: monitoringList[index].id,
                idProspection: monitoringList[index].idProspection,
                instagramName: monitoringList[index].instagramName,
                name: monitoringList[index].name,
                status: monitoringList[index].status,
                statusName: monitoringList[index].statusName,
                productName: await this.getProductsByMonitoring(monitoringList[index].idProspection)
            });
        }

        return monitoringListChange;

    }

    async getAllPublicationMonitoringByMonitoring(idUser: number, idMonitoring: number){

        try {

            const useIsDirectorOrTeamLeader = await authService.validateUserPolicy(idUser, 'influencer', 3);
            if(!useIsDirectorOrTeamLeader){
                const userMonitoring = await monitoringRepository.isUserMonitoring(idMonitoring, idUser);
                if(!userMonitoring){
                    throw new MonitoringError("Usuário está tentando listar um monitoramento não feito por ele!");
                }
            }

            let publicationList = await PublicationMonitoring.findAll({
                attributes: ['id', 'datePublication', 'link', 'comment', 'color', 'isEvaluation', 'idStatusPublication'],
                include: [
                    {
                        model: StatusPublicationMonitoring,
                        as: 'statusPublication',
                        attributes: ['id', 'description'],
                        required: false
                    },{
                        model: PublicationStories,
                        as: 'publicationStories',
                        attributes: ['sequence', 'link'],
                        required: false
                    },{
                        model: PublicationPhoto,
                        as: 'publicationPhoto',
                        attributes: ['photo', 'dateReceive', 'datePost'],
                        required: false
                    },{
                        model: PublicationVideo,
                        as: 'publicationVideo',
                        attributes: ['video', 'dateReceive', 'datePost', 'isReels', 'isTiktok', 'isYoutube'],
                        required: false
                    }
                ],
                where: { idMonitoring: idMonitoring },
            });

            return publicationList;
            
            
        } catch (error) {
            throw error;
        }

    }

    async getAllPublicationMonitoringByUser(idUser: number, idUserMonitoring: number){

        try {

            const publicationList = await Monitoring.findAll({
                attributes: ['id'],
                include: [{
                    model: MonitoringUserActual,
                    as: 'monitoringActual',
                    attributes: ['idUser'],
                    where: { idUser: idUserMonitoring },
                    required: true
                }],
                where: { 
                    idStatus: {
                        [Op.gt]: 1
                    } 
                }
            });

            if(publicationList.length > 0){
                var publicationFormattedList: any = [];

                for (const index in publicationList) {
                    const list = await PublicationMonitoring.findAll({
                        attributes: ['id', 'datePublication', 'link', 'comment', 'color', 'isEvaluation', 'idStatusPublication'],
                        include: [
                            {
                                model: StatusPublicationMonitoring,
                                as: 'statusPublication',
                                attributes: ['id', 'description']
                            },{
                                model: PublicationStories,
                                as: 'publicationStories',
                                attributes: ['sequence', 'link'] 
                            },{
                                model: PublicationPhoto,
                                as: 'publicationPhoto',
                                attributes: ['photo', 'dateReceive', 'datePost'] 
                            },{
                                model: PublicationVideo,
                                as: 'publicationVideo',
                                attributes: ['video', 'dateReceive', 'datePost', 'isReels', 'isTiktok', 'isYoutube'] 
                            }
                        ],
                        where: { idMonitoring: publicationList[index].id },
                    });

                    publicationFormattedList.push({
                        idUserMonitoring: publicationList[index].id,
                        publications: [...list]
                    });
                }

                return publicationFormattedList;
            
            }else{
                return [];
            }
            
        } catch (error) {
            throw error;
        }

    }

    async getAllPublicationMonitoringBySquad(idSquad: number){

        try {

            const monitoringList: any = await Monitoring.findAll({
                attributes: ['id'],
                where: { 
                    idStatus: {
                        [Op.gt]: 1
                    } 
                },
                //raw: true,
                include: [
                    {
                        model: Prospection,
                        as: 'prospection',
                        attributes: ['id'],
                        where: { idSquad: idSquad },
                        required: true
                    },{
                        model: MonitoringUserActual,
                        as: 'monitoringActual',
                        attributes: ['idUser'],
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['id', 'name']
                            }
                        ]
                    }
                ]
            });

            if(monitoringList.length > 0){
                var publicationFormattedList: any = [];

                for (const index in monitoringList) {
                    const list = await PublicationMonitoring.findAll({
                        attributes: ['id', 'datePublication', 'link', 'comment', 'color', 'isEvaluation', 'idStatusPublication'],
                        include: [
                            {
                                model: StatusPublicationMonitoring,
                                as: 'statusPublication',
                                attributes: ['id', 'description']
                            },{
                                model: PublicationStories,
                                as: 'publicationStories',
                                attributes: ['sequence', 'link'] 
                            },{
                                model: PublicationPhoto,
                                as: 'publicationPhoto',
                                attributes: ['photo', 'dateReceive', 'datePost'] 
                            },{
                                model: PublicationVideo,
                                as: 'publicationVideo',
                                attributes: ['video', 'dateReceive', 'datePost', 'isReels', 'isTiktok', 'isYoutube'] 
                            }
                        ],
                        where: { idMonitoring: monitoringList[index].id },
                    });

                    publicationFormattedList.push({
                        idMonitoring: monitoringList[index].id,
                        userMonitoring: { id: monitoringList[index].monitoringActual.user.id, name: monitoringList[index].monitoringActual.user.name },
                        publications: [...list]
                    });
                }

                return publicationFormattedList;
            
            }else{
                return [];
            }
            
        } catch (error) {
            throw error;
        }

    }

    async getAllPublicationMonitoring(){

        try {

            const monitoringList: any = await Monitoring.findAll({
                attributes: ['id'],
                where: { 
                    idStatus: {
                        [Op.gt]: 1
                    } 
                },
                //raw: true,
                include: [
                    {
                        model: Prospection,
                        as: 'prospection',
                        attributes: ['id'],
                        required: true
                    },{
                        model: MonitoringUserActual,
                        as: 'monitoringActual',
                        attributes: ['idUser'],
                        include: [
                            {
                                model: User,
                                as: 'user',
                                attributes: ['id', 'name']
                            }
                        ]
                    }
                ]
            });

            if(monitoringList.length > 0){
                var publicationFormattedList: any = [];

                for (const index in monitoringList) {
                    const list = await PublicationMonitoring.findAll({
                        attributes: ['id', 'datePublication', 'link', 'comment', 'color', 'isEvaluation', 'idStatusPublication'],
                        include: [
                            {
                                model: StatusPublicationMonitoring,
                                as: 'statusPublication',
                                attributes: ['id', 'description']
                            },{
                                model: PublicationStories,
                                as: 'publicationStories',
                                attributes: ['sequence', 'link'] 
                            },{
                                model: PublicationPhoto,
                                as: 'publicationPhoto',
                                attributes: ['photo', 'dateReceive', 'datePost'] 
                            },{
                                model: PublicationVideo,
                                as: 'publicationVideo',
                                attributes: ['video', 'dateReceive', 'datePost', 'isReels', 'isTiktok', 'isYoutube'] 
                            }
                        ],
                        where: { idMonitoring: monitoringList[index].id },
                    });

                    publicationFormattedList.push({
                        idMonitoring: monitoringList[index].id,
                        userMonitoring: { id: monitoringList[index].monitoringActual.user.id, name: monitoringList[index].monitoringActual.user.name },
                        publications: [...list]
                    });
                }

                return publicationFormattedList;
            
            }else{
                return [];
            }
            
        } catch (error) {
            throw error;
        }

    }

    async   selectNewUserMonitoring(newUserMonitoring: any, transactionMonitoring: Transaction){

        try {

            const statusMonitoring = await Monitoring.findOne({ where: { id: newUserMonitoring.idMonitoring }});
            if(!statusMonitoring){
                throw new MonitoringError();
            }else if(statusMonitoring.idStatus != 1){
                throw new MonitoringError("O monitoramento selecionado não está no status de Aguardando Encaminhamento!");
            }   

            const userMonitoring = await authService.validateTypeUserInfluencer(newUserMonitoring.idUser, newUserMonitoring.idSquad, 2);
            if(!userMonitoring){
                throw new MonitoringError("O usuário selecionado não faz parte da equipe de monitoramento!");
            }

            const userTotalMonitoring: any = await monitoringRepository.getAllMonitoringByUserCount(newUserMonitoring.idSquad, newUserMonitoring.idUser);
            if(userTotalMonitoring.total >= 30){
                throw new MonitoringError("O usuário selecionado possui 30 monitoramentos em andamento. Por favor, selecione um com menos de 30 monitoramentos!");
            }

            await MonitoringUserActual.create({ idMonitoring: newUserMonitoring.idMonitoring, idUser: newUserMonitoring.idUser }, { transaction: transactionMonitoring });
            await Monitoring.update({ idStatus: 2 }, { where: { id: newUserMonitoring.idMonitoring }, transaction: transactionMonitoring });
            await notificationService.monitoringNotification(newUserMonitoring.idMonitoring, 2, newUserMonitoring.idUser, 1, "Selecionado para Monitoramento", `Analista selecionado para o monitoramento ${newUserMonitoring.idMonitoring}`, transactionMonitoring)
            return;
            
        } catch (error) {
            throw error;
        }

    }

    async createPublication(publication: any, link: any, idUser: number, transactionPublication: Transaction){

        try {

            const userMonitoring: any = await MonitoringUserActual.findOne({ where: { idMonitoring: publication.idMonitoring, idUser: idUser }});
            if(!userMonitoring){
                throw new MonitoringError("O usuário selecionado não faz parte desse monitoramento!");
            }
            
            if(publication.isLink) var newLinkPublication: any = await this.generateAutomaticTrakingLink(publication.idMonitoring, link)
            
            const newPublication =  await PublicationMonitoring.create({ 
                datePublication: publication.datePublication, link: newLinkPublication, comment: publication.comment, color: publication.color,  idStatusPublication: 1, 
                idMonitoring: publication.idMonitoring, isEvaluation: false, isStories: publication.isStories, isPhoto: publication.isPhoto, isVideo: publication.isVideo
            }, { transaction: transactionPublication });

            if(publication.isStories){
                await PublicationStories.create({
                    sequence: publication.stories.sequence, link: publication.stories.link, idPublication: newPublication.id
                }, { transaction: transactionPublication });
            }

            if(publication.isPhoto){
                await PublicationPhoto.create({
                    photo: publication.photo.photo, dateReceive: publication.photo.dateReceive, datePost: publication.photo.datePost, idPublication: newPublication.id
                }, { transaction: transactionPublication });
            }

            if(publication.isVideo){
                await PublicationVideo.create({
                    video: publication.video.video, dateReceive: publication.video.dateReceive, datePost: publication.video.datePost, 
                    isReels: publication.video.isReels, isTiktok: publication.video.isTiktok, isYoutube: publication?.video?.isYoutube ?? false, idPublication: newPublication.id
                }, { transaction: transactionPublication });
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async updatePublication(publication: any, idUser: number, transactionPublication: Transaction){

        try {

            const publicationMonitoring: any = await PublicationMonitoring.findOne({ where: { id: publication.idPublication }});

            const userMonitoring: any = await MonitoringUserActual.findOne({ where: { idMonitoring: publicationMonitoring.idMonitoring, idUser: idUser }});
            if(!userMonitoring){
                throw new MonitoringError("O usuário selecionado não faz parte desse monitoramento!");
            }

            await PublicationMonitoring.update({ 
                datePublication: publication.datePublication, link: publication.link, comment: publication.comment, color: publication.color,  idStatusPublication: publication.status, 
                isEvaluation: false, isStories: publication.isStories, isPhoto: publication.isPhoto, isVideo: publication.isVideo
            }, { where: { id: publication.idPublication }, transaction: transactionPublication });

            // UPDATE STORIES
            const stories = await PublicationStories.findOne({ where: { idPublication: publication.idPublication }});
            if(stories){
                if(publication.isStories){
                    await PublicationStories.update({
                        sequence: publication.stories.sequence, link: publication.stories.link
                    }, { where: { idPublication: publication.idPublication }, transaction: transactionPublication });
                }else{ 
                    await PublicationStories.destroy({ where: { idPublication: publication.idPublication }, transaction: transactionPublication });
                }
            }else{
                if(publication.isStories){
                    await PublicationStories.create({
                        sequence: publication.stories.sequence, link: publication.stories.link, idPublication: publication.idPublication
                    }, { transaction: transactionPublication });
                }
            }

            // UPDATE PHOTO
            const photo = await PublicationPhoto.findOne({ where: { idPublication: publication.idPublication }});
            if(photo){
                if(publication.isPhoto){
                    await PublicationPhoto.update({
                        photo: publication.photo.photo, dateReceive: publication.photo.dateReceive, datePost: publication.photo.datePost
                    }, { where: { idPublication: publication.idPublication }, transaction: transactionPublication });
                }else{ 
                    await PublicationPhoto.destroy({ where: { idPublication: publication.idPublication }, transaction: transactionPublication });
                }
            }else{
                if(publication.isPhoto){
                    await PublicationPhoto.create({
                        photo: publication.photo.photo, dateReceive: publication.photo.dateReceive, datePost: publication.photo.datePost, idPublication: publication.idPublication
                    }, { transaction: transactionPublication });
                }
            }

            // UPDATE VIDEO
            const video = await PublicationVideo.findOne({ where: { idPublication: publication.idPublication }});
            if(video){
                if(publication.isVideo){
                    await PublicationVideo.update({
                        video: publication.video.video, dateReceive: publication.video.dateReceive, datePost: publication.video.datePost, 
                        isReels: publication.video.isReels, isTiktok: publication.video.isTiktok, isYoutube: publication.video.isYoutube,
                    }, { where: { idPublication: publication.idPublication }, transaction: transactionPublication });
                }else{ 
                    await PublicationVideo.destroy({ where: { idPublication: publication.idPublication }, transaction: transactionPublication });
                }
            }else{
                if(publication.isVideo){
                    await PublicationVideo.create({
                        video: publication.video.video, dateReceive: publication.video.dateReceive, datePost: publication.video.datePost, 
                        isReels: publication.video.isReels, isTiktok: publication.video.isTiktok, isYoutube: publication.video.isYoutube, idPublication: publication.idPublication
                    }, { transaction: transactionPublication });
                }
            }

            await PublicationLog.create({ description: `O usuário alterou a publicação do id ${publication.idPublication}`, comment: publication.commentChange, idMonitoring: publicationMonitoring.idMonitoring }, { transaction: transactionPublication });

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async evaluationPublication(publication: any, transactionEvaluation: Transaction){

        try {

            const publicationMonitoring: any = await PublicationMonitoring.findOne({ where: { id: publication.idPublication }});
            if(publicationMonitoring.idStatusPublication === 1 || publicationMonitoring.isEvaluation === true ){
                throw new MonitoringError("Não é possível avaliar a publicação. Já foi alterada ou publicação ainda não concluída!");
            }else{
                await EvaluationPublicationMonitoring.create(publication, { transaction: transactionEvaluation });
                await PublicationMonitoring.update({ isEvaluation: true }, { where: { id: publication.idPublication }, transaction: transactionEvaluation });
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    // ******** ROADMAP ********

    async createRoadmap(roadmap: any, file: any, transactionRoadmap: Transaction){

        try {

            let pathRoadmap;
      
            if(file){
                const { filename: path } = file;
                pathRoadmap = path;
            }else{
                throw new MonitoringError('Falta anexar o formulário do roteiro!');
            }

            if(roadmap.isRoadmap == "true"){
                await MonitoringRoadmap.create({ description: roadmap.description, isRoadmap: roadmap.isRoadmap, statusRoadmap: 1, idMonitoring: roadmap.idMonitoring, path: pathRoadmap }, { transaction: transactionRoadmap });
            }else{
                await MonitoringRoadmap.create({ description: roadmap.description, isRoadmap: roadmap.isRoadmap, statusRoadmap: 9, idMonitoring: roadmap.idMonitoring, path: pathRoadmap }, { transaction: transactionRoadmap });
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async getAllRoadmapByUser(idMonitoring: number, status: number){

        try {

            const roadMapList = await  monitoringRepository.getAllRoadmapByUser(idMonitoring, status);
            return roadMapList;
            
        } catch (error) {
            throw error;
        }

    }

    async getAllRoadmapByWording(status: number){

        try {

            const roadMapList = await  monitoringRepository.getAllRoadmapByWording(status);
            return roadMapList;
            
        } catch (error) {
            throw error;
        }

    }

    async createRoadmapWording(roadmap: any, files: any, transactionRoadmap: Transaction){

        try {

            let pathRoadmap;
      
            if(files.length > 0){

                for(const index in files){
                    const { filename: path } = files[index];
                    pathRoadmap = path;

                    await MonitoringRoadmapWording.create({ idRoadmap: roadmap.idRoadmap, path: pathRoadmap }, { transaction: transactionRoadmap });
                }

            }else{
                throw new MonitoringError('Falta anexar arquivo!');
            }

            await MonitoringRoadmap.update({ statusRoadmap: 2 }, { where: { id: roadmap.idRoadmap }, transaction: transactionRoadmap });

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async getAllRoadmapByWordingFiles(idRoadmap: number){

        try {

            const roadmap = await MonitoringRoadmap.findOne({ where: { id: idRoadmap }});
            
            if(roadmap?.isRoadmap){
                var roadMapList: any = await MonitoringRoadmapWording.findAll({ attributes: ['path'], where: { idRoadmap: idRoadmap }});
            }else{
                var roadMapList: any = await MonitoringRoadmap.findAll({ attributes: ['path'], where: { id: idRoadmap }});
            }

            return roadMapList;

        } catch (error) {
            throw error;
        }

    }

    async createTokenRoadmap(roadmap: any, transactionRoadmap: Transaction) {

        try {

            // get celphone to send in whatsapp
            const monitoringRoadmap = await MonitoringRoadmap.findOne({ where: { id: roadmap.idRoadmap }});
            const monitoring = await Monitoring.findOne({ where: { id: monitoringRoadmap!.idMonitoring }});
            const prospection = await ProspectionInformation.findOne({ where: { idProspection: monitoring!.idProspection }});

            const token = jwt.sign({idRoadmap: roadmap.idRoadmap, time: new Date()}, AuthConfig.cod!, {expiresIn: AuthConfig.expiresInTokenDocument});
            await MonitoringTokenRoadmap.create({ idRoadmap: roadmap.idRoadmap, token: token }, { transaction: transactionRoadmap });
            await MonitoringRoadmap.update({ statusRoadmap: 4 }, { where: { id: roadmap.idRoadmap }, transaction: transactionRoadmap });

            return { token: token, telephone: prospection?.cel };
            
        } catch (error) {
            throw error;
        }

    }

    async validateTokenRoadmap(token: string) {

        try {

            const tokenProspection = await MonitoringTokenRoadmap.findOne({ where: { token: token }, raw: true });
            if(!tokenProspection){
                throw new MonitoringError('Token inválido para a operação');
            }

            var idRoadmap;
            jwt.verify(token, AuthConfig.cod!, (err: any, decoded: any) => {
                if (err || !decoded) {
                    throw new AuthError('Token expirado ou inválido!');
                }else{
                    idRoadmap = decoded.idRoadmap;
                }
            });

            const commentMaterial = await MonitoringRoadmap.findOne({ where: { id: idRoadmap }, raw: true });

            return { idRoadmap: idRoadmap, comment: commentMaterial?.comment } ;
            
        } catch (error) {
            throw error;
        }

    }

    async createRoadmapMaterial(roadmap: any, files: any, transactionRoadmap: Transaction){

        try {

            let pathRoadmap;
      
            if(files.length > 0){

                for(const index in files){
                    const { filename: path } = files[index];
                    pathRoadmap = path;

                    await MonitoringRoadmapMaterial.create({ idRoadmap: roadmap.idRoadmap, path: pathRoadmap }, { transaction: transactionRoadmap });
                }

            }else{
                throw new MonitoringError('Falta anexar arquivo!');
            }

            await MonitoringRoadmap.update({ statusRoadmap: 5 }, { where: { id: roadmap.idRoadmap }, transaction: transactionRoadmap });

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async getAllRoadmapByMaterialFiles(idRoadmap: number){

        try {

            const roadMapList = await MonitoringRoadmapMaterial.findAll({ attributes: ['path'], where: { idRoadmap: idRoadmap }});
            return roadMapList;

        } catch (error) {
            throw error;
        }

    }

    async approvalMaterialRoadmap(roadmap: any, transactionRoadmap: Transaction){

        try {

            if(roadmap.step === 7 || roadmap.step === 10){
                await MonitoringRoadmap.update({ statusRoadmap: roadmap.step }, { where: { id: roadmap.idRoadmap }, transaction: transactionRoadmap });
            }else{
                await MonitoringRoadmap.update({ statusRoadmap: roadmap.step, comment: roadmap.comment }, { where: { id: roadmap.idRoadmap }, transaction: transactionRoadmap });
            }

        } catch (error) {
            throw error;
        }

    }

    async generateAutomaticTrakingLink(idMonitoring: number, link:any) {

        try {
            const prospection = await Monitoring.findOne({where: {id: idMonitoring}})
            const codContract:any = await Prospection.findOne({where: {id: prospection?.idProspection}})
            const campaign = await ProspectionChecklist.findOne({where: {idProspection: prospection?.idProspection}})
            let typeUser: any = `HR-${codContract.cod}`

            const generateLink = `${link.url}?utm_source=${link.origin}&utm_medium=${typeUser}%20${link.media}&utm_campaign=${campaign?.nickname}&utm_content=${link.content}&utm_term=none`
            return generateLink
        }
        catch (error) {
            throw error
        }
    }
    
    async updateTrakingLink(link: any, transaction: Transaction) {

        try {
            const updatelink = await this.generateAutomaticTrakingLink(link.idMonitoring, link)
            await PublicationMonitoring.update({link: updatelink}, {where: {id: link.idPublication}, transaction: transaction})
    
            return 
        }
        catch(error) {
            throw error
        }
    }

    async deletePublication(idPublication: number, transaction: Transaction) {

        try {

            await PublicationMonitoring.destroy({where: {id: idPublication}, transaction: transaction})
    
            return 
        }
        catch(error) {
            throw error
        }
    }

}

export default new MonitoringService();