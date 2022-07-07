import { Transaction } from 'sequelize/types';
import TypeNotification from "../models/type_notification"
import ActionNotification from "../models/action_notification"
import ProspectionNotification from '../models/prospection_notification';
import ProspectionUserActual from '../../../influencer/prospection/shared/models/prospection_user_actual';
import MonitoringUserActual from '../../../influencer/monitoring/shared/models/monitoring_user_actual';
import notificationRepository from '../../repository/notification_repository';
import MonitoringNotification from '../models/monitoring_notification';
import Monitoring from '../../../influencer/monitoring/shared/models/monitoring';
import Prospection from '../../../influencer/prospection/shared/models/prospection';
import Squad from '../../../influencer/squad/shared/models/squad';
import Influencer from '../../../influencer/influencer_client/shared/models/influencer';
import ProcessProspection from '../../../influencer/prospection/shared/models/process_prospection';
import StatusProspection from '../../../influencer/prospection/shared/models/status_prospection';
import User from '../../../profile/user/shared/models/user';

class NotificationService {

    // ==== GET ====

    async getNotificationBySector(idUser: number, sector: any) {

        var influencerProsp: any = [], influencerMonit: any = [];
        var legalProsp: any = [];
        var influencer: any, legal: any, financial;

        try {

            if(sector.name === "jurídico") {
        
                legal = [];
                const notification: any = await notificationRepository.getNotification(sector.id);
                if(notification.length > 0){
                    var prospectionLegal: any = [];
                    for (const index in notification) {

                        if(notification[index].idDetail === 3){
                            const prospectionNot = await ProspectionNotification.findOne({ attributes: ['idProspection'], where: { idActionNotification: notification[index].idAction }});
                            const prospection = await Prospection.findOne({ where: { id: prospectionNot!.idProspection }});
                            const processProspection = await ProcessProspection.findOne({ attributes: ['idStatus'], where: { idProspection: prospectionNot!.idProspection }});
                            const statusProspection = await StatusProspection.findOne({ where: { id: processProspection!.idStatus }});
                            const squad = await Squad.findOne({ where: { id: prospection!.idSquad }});
                            const influencer = await Influencer.findOne({ where: { id: prospection!.idInfluencer }});

                            prospectionLegal.push({ 
                                "idSquad": squad?.id,
                                "name": squad?.name,
                                "instagramName": influencer?.instagramName,
                                "teamLeaderProspection": false,
                                "teamLeaderMonitoring": false,
                                "userProspection": false,
                                "userMonitoring": false,
                                "module": "legal",
                                "idStatus": processProspection?.idStatus,
                                "statusName": statusProspection?.description,
                                "idProspection": prospection?.id,
                                "message": notification[index].message,
                                "title": notification[index].title,
                                "idDetail": notification[index].idDetail,
                                "idAction": notification[index].idAction
                            });

                            legalProsp.push({ prospection: prospectionLegal[index] });
                        }
                    }  
                }

                legal.push(...legalProsp);
            } else if (sector.name === "financeiro") {

                const notification = await notificationRepository.getNotification(sector.id)
                financial = notification
            } else if (sector.name === "influencer") {
                
                influencer = [];
                var prospectionInfluencer: any = [];
                var notificationProspection: any = await notificationRepository.getNotificationInfluencerDirector(sector.id, 1) // 1: Prospecção
                if(notificationProspection.length > 0){
                    for (const index in notificationProspection) {

                        const prospectionNot = await ProspectionNotification.findOne({ attributes: ['idProspection'], where: { idActionNotification: notificationProspection[index].idAction }});
                        const prospection = await Prospection.findOne({ where: { id: prospectionNot!.idProspection }});
                        const processProspection = await ProcessProspection.findOne({ attributes: ['idStatus'], where: { idProspection: prospectionNot!.idProspection }});
                        const statusProspection = await StatusProspection.findOne({ where: { id: processProspection!.idStatus }});
                        const squad = await Squad.findOne({ where: { id: prospection!.idSquad }});
                        const influencer = await Influencer.findOne({ where: { id: prospection!.idInfluencer }});

                        prospectionInfluencer.push({ 
                            "idSquad": squad?.id,
                            "name": squad?.name,
                            "instagramName": influencer?.instagramName,
                            "teamLeaderProspection": false,
                            "teamLeaderMonitoring": false,
                            "userProspection": false,
                            "userMonitoring": false,
                            "module": "prospection",
                            "idStatus": processProspection?.idStatus,
                            "statusName": statusProspection?.description,
                            "idProspection": prospection?.id,
                            "message": notificationProspection[index].message,
                            "title": notificationProspection[index].title,
                            "idDetail": notificationProspection[index].idDetail,
                            "idAction": notificationProspection[index].idAction
                        });

                        influencerProsp.push({
                            prospection: prospectionInfluencer[index]
                        })
                    }   
                }

                var monitoringInfluencer: any = [];
                var notificationMonitoring: any = await notificationRepository.getNotificationInfluencerDirector(sector.id, 2) // 2: Monitoramento
                if(notificationMonitoring.length > 0){
                    for (const index in notificationMonitoring) {
                        const monitoringNot = await MonitoringNotification.findOne({ attributes: ['idMonitoring'], where: { idActionNotification: notificationMonitoring[index].idAction }});
                        const monitoring = await Monitoring.findOne({ where: { id: monitoringNot!.idMonitoring }});
                        const prospection = await Prospection.findOne({ where: { id: monitoring!.idProspection }});
                        //const processProspection = await ProcessProspection.findOne({ attributes: ['idStatus'], where: { idProspection: monitoring!.idProspection }});
                        const influencer = await Influencer.findOne({ where: { id: prospection?.idInfluencer }});
                        const squad = await Squad.findOne({ where: { id: prospection!.idSquad }});

                        monitoringInfluencer.push({ 
                            "idSquad": squad?.id,
                            "name": squad?.name,
                            "teamLeaderProspection": false,
                            "teamLeaderMonitoring": false,
                            "userProspection": false,
                            "userMonitoring": false,
                            "module": "monitoring",
                            "instagramName": influencer?.instagramName,
                            "idStatus": 0,
                            "idMonitoring": monitoring?.id,
                            "idProspection": monitoring!.idProspection,
                            "message": notificationMonitoring[index].message,
                            "title": notificationMonitoring[index].title,
                            "idDetail": notificationMonitoring[index].idDetail,
                            "idAction": notificationMonitoring[index].idAction
                        });

                        influencerMonit.push({
                            monitoring: monitoringInfluencer[index]
                        })
                    }   
                }

                influencer.push(...influencerProsp, ...influencerMonit);
                
            }
            
            return { legal: legal, financial: financial, influencer: influencer };

        }
        catch (error) {  
            throw error
        }

    }

    async getNotificationInfluencer(idUser: number, sector: any) {

        
        var influencerProsp: any = [], influencerMonit: any = [];
        var influencer: any = [], legal, financial;

        try {

            const analistProspection = await ProspectionUserActual.findOne( { where: {idUser: idUser}})
            const teamLeaderProspection = await Squad.findOne({where: {idTeamLeader: idUser}})

            const analistMonitoring = await MonitoringUserActual.findOne( { where: {idUser: idUser}})
            const teamLeaderMonitoring = await Squad.findOne({where: {idTeamLeaderMonitoring: idUser}})


            if(analistProspection) {

                var prospectionInfluencer: any = [];
                var notificationProspection: any = await notificationRepository.getNotificationInfluencer(idUser, sector.id, 1) // 1: Prospecção
                if(notificationProspection.length > 0){
                    for (const index in notificationProspection) {
                        const prospectionNot = await ProspectionNotification.findOne({ attributes: ['idProspection'], where: { idActionNotification: notificationProspection[index].idAction }});
                        const prospection = await Prospection.findOne({ where: { id: prospectionNot!.idProspection }});
                        const processProspection = await ProcessProspection.findOne({ attributes: ['idStatus'], where: { idProspection: prospectionNot!.idProspection }});
                        const statusProspection = await StatusProspection.findOne({ where: { id: processProspection!.idStatus }});
                        const squad = await Squad.findOne({ where: { id: prospection!.idSquad }});
                        const influencer = await Influencer.findOne({ where: { id: prospection!.idInfluencer }});

                        prospectionInfluencer.push({ 
                            "idSquad": squad?.id,
                            "name": squad?.name,
                            "instagramName": influencer?.instagramName,
                            "teamLeaderProspection": false,
                            "teamLeaderMonitoring": false,
                            "userProspection": true,
                            "userMonitoring": false,
                            "module": "prospection",
                            "idStatus": processProspection?.idStatus,
                            "statusName": statusProspection?.description,
                            "idProspection": prospection?.id,
                            "message": notificationProspection[index].message,
                            "title": notificationProspection[index].title,
                            "idDetail": notificationProspection[index].idDetail,
                            "idAction": notificationProspection[index].idAction
                        });

                        influencerProsp.push({
                            prospection: prospectionInfluencer[index]
                        })
                    }   
                }
            }

            if(teamLeaderProspection) {

                var prospectionInfluencer: any = [];
                var notificationProspection: any = await notificationRepository.getNotificationInfluencer(idUser, sector.id, 1) // 1: Prospecção
                if(notificationProspection.length > 0){
                    for (const index in notificationProspection) {
                        const prospectionNot = await ProspectionNotification.findOne({ attributes: ['idProspection'], where: { idActionNotification: notificationProspection[index].idAction }});
                        const prospection = await Prospection.findOne({ where: { id: prospectionNot!.idProspection }});
                        const processProspection = await ProcessProspection.findOne({ attributes: ['idStatus'], where: { idProspection: prospectionNot!.idProspection }});
                        const statusProspection = await StatusProspection.findOne({ where: { id: processProspection!.idStatus }});
                        const squad = await Squad.findOne({ where: { id: prospection!.idSquad }});
                        const influencer = await Influencer.findOne({ where: { id: prospection!.idInfluencer }});

                        prospectionInfluencer.push({ 
                            "idSquad": squad?.id,
                            "name": squad?.name,
                            "instagramName": influencer?.instagramName,
                            "teamLeaderProspection": true,
                            "teamLeaderMonitoring": false,
                            "userProspection": true,
                            "userMonitoring": false,
                            "module": "prospection",
                            "idStatus": processProspection?.idStatus,
                            "statusName": statusProspection?.description,
                            "idProspection": prospection?.id,
                            "message": notificationProspection[index].message,
                            "title": notificationProspection[index].title,
                            "idDetail": notificationProspection[index].idDetail,
                            "idAction": notificationProspection[index].idAction
                        });

                        influencerProsp.push({
                            prospection: prospectionInfluencer[index]
                        })
                    }   
                }
            }
            
            if(analistMonitoring) {

                var monitoringInfluencer: any = [];
                var notificationMonitoring: any = await notificationRepository.getNotificationInfluencer(idUser, sector.id, 2) // 2: Monitoramento
                if(notificationMonitoring.length > 0){
                    for (const index in notificationMonitoring) {
                        const monitoringNot = await MonitoringNotification.findOne({ attributes: ['idMonitoring'], where: { idActionNotification: notificationMonitoring[index].idAction }});
                        const monitoring = await Monitoring.findOne({ where: { id: monitoringNot!.idMonitoring }});
                        const prospection = await Prospection.findOne({ where: { id: monitoring!.idProspection }});
                        const influencer = await Influencer.findOne({ where: { id: prospection?.idInfluencer }});
                        const squad = await Squad.findOne({ where: { id: prospection!.idSquad }});

                        monitoringInfluencer.push({ 
                            "idSquad": squad?.id,
                            "name": squad?.name,
                            "teamLeaderProspection": false,
                            "teamLeaderMonitoring": false,
                            "userProspection": false,
                            "userMonitoring": false,
                            "module": "monitoring",
                            "instagramName": influencer?.instagramName,
                            "idStatus": 0,
                            "idMonitoring": monitoring?.id,
                            "idProspection": monitoring!.idProspection,
                            "message": notificationMonitoring[index].message,
                            "title": notificationMonitoring[index].title,
                            "idDetail": notificationMonitoring[index].idDetail,
                            "idAction": notificationMonitoring[index].idAction
                        });

                        influencerMonit.push({
                            monitoring: monitoringInfluencer[index]
                        })
                    }   
                }
                
            }

            if(teamLeaderMonitoring) {

                var monitoringInfluencer: any = [];
                var notificationMonitoring: any = await notificationRepository.getNotificationInfluencer(idUser, sector.id, 2) // 2: Monitoramento
                if(notificationMonitoring.length > 0){
                    for (const index in notificationMonitoring) {
                        const monitoringNot = await MonitoringNotification.findOne({ attributes: ['idMonitoring'], where: { idActionNotification: notificationMonitoring[index].idAction }});
                        const monitoring = await Monitoring.findOne({ where: { id: monitoringNot!.idMonitoring }});
                        const prospection = await Prospection.findOne({ where: { id: monitoring!.idProspection }});
                        const influencer = await Influencer.findOne({ where: { id: prospection?.idInfluencer }});
                        const squad = await Squad.findOne({ where: { id: prospection!.idSquad }});

                        monitoringInfluencer.push({ 
                            "idSquad": squad?.id,
                            "name": squad?.name,
                            "teamLeaderProspection": false,
                            "teamLeaderMonitoring": false,
                            "userProspection": false,
                            "userMonitoring": false,
                            "module": "monitoring",
                            "instagramName": influencer?.instagramName,
                            "idStatus": 0,
                            "idMonitoring": monitoring?.id,
                            "idProspection": monitoring!.idProspection,
                            "message": notificationMonitoring[index].message,
                            "title": notificationMonitoring[index].title,
                            "idDetail": notificationMonitoring[index].idDetail,
                            "idAction": notificationMonitoring[index].idAction
                        });

                        influencerMonit.push({
                            monitoring: monitoringInfluencer[index]
                        })
                    }   
                }
                
            }

            influencer.push(...influencerProsp, ...influencerMonit);

            return {legal: legal, financial: financial,influencer: influencer}
        }
        catch (error) {
            throw error
        }

    }

    async getTeamLeaderProspection(idProspection: number) {

        try {

            const teamLeaderProspection = await notificationRepository.teamLeaderProspection(idProspection)
            return teamLeaderProspection

        }
        catch (error) {
            throw error
        }
    }

    async getTeamLeaderMonitoring(idProspection: number) {

        try {

            const teamLeaderProspection = await notificationRepository.teamLeaderMonitoring(idProspection)
            return teamLeaderProspection

        }
        catch (error) {
            throw error
        }
    }

    async getAnalistProspection(idProspection: number) {

        try {

            const analistProspection = await ProspectionUserActual.findOne( {  attributes: ['idUser'] , where: {idProspection: idProspection}})
            return analistProspection?.idUser

        }
        catch (error) {
            throw error
        }
    }

    async getInstagramInfluencer(idProspection: number) {

        try {

            const idInfluencer = await Prospection.findOne({ where: {id: idProspection}})
            const instagramInfluencer = await Influencer.findOne({ where: {id: idInfluencer?.idInfluencer}})
            return instagramInfluencer

        }
        catch (error) {
            throw error
        }
    }



    // ==== POST ==== 
    
    async prospectionNotification(idProspection: number, idDetail: number, typeNotification: number,title: string, message: any, transactionNotification: Transaction, idMonitoring?: any) {

        try {

            if(typeNotification == 1) { // 1:SOLICITAÇÃO APROVAÇÃO NEGOCIAÇÃO 

                const typeNotificationProspection = await TypeNotification.create({idSector:48, idModuleNotification: 1})
                const teamLeader = await this.getTeamLeaderProspection(idProspection)
                
                const actionTeamLeader = await ActionNotification.create({title: title, message: message, idUser: Number(teamLeader), idTypeNotification: typeNotificationProspection.id, idDetailNotification: idDetail}, {transaction: transactionNotification}) 
                await ProspectionNotification.create({idActionNotification:actionTeamLeader.id, idProspection:idProspection}, {transaction: transactionNotification})

                const actionDirector = await ActionNotification.create({title: title, message: message, idTypeNotification: typeNotificationProspection.id, idDetailNotification: idDetail}, {transaction: transactionNotification}) 
                await ProspectionNotification.create({idActionNotification:actionDirector.id, idProspection:idProspection}, {transaction: transactionNotification})

            } else if(typeNotification == 2) { // ENVIO NOTIFICAÇÃO PARA ANALISTA ( 2:APROVAÇÃO NEGOCIAÇÃO, 3:REPROVAÇÃO NEGOCIAÇÃO, 4:ENVIO DOCUMENTAÇÃO INFLUENCER, 6:VALIDAÇÃO CONTRATO JURÍDICO)

                const typeNotification = await TypeNotification.create({idSector:48, idModuleNotification: 1})
                const analistProspection = Number(await this.getAnalistProspection(idProspection))
                const actionAnalistProspection = await ActionNotification.create({title: title, message: message, idUser: analistProspection, idTypeNotification: typeNotification.id, idDetailNotification: idDetail}, {transaction: transactionNotification}) 
                await ProspectionNotification.create({idActionNotification:actionAnalistProspection.id, idProspection:idProspection}, {transaction: transactionNotification})
            
            } else if (typeNotification == 3) { // 5:APROVAÇÃO DADOS PAGAMENTO PARA O JURÍDICO
                
                const typeNotification = await TypeNotification.create({idSector:45, idModuleNotification: 1});           
                const action = await ActionNotification.create({title: title, message: message, idTypeNotification: typeNotification.id, idDetailNotification: idDetail}, {transaction: transactionNotification}) 
                await ProspectionNotification.create({idActionNotification:action.id, idProspection:idProspection}, {transaction: transactionNotification})

            } else if (typeNotification == 4) { // 6:ASSINATURA CONTRATO NOTIFICAÇÃO PARA ANALISTA, TEAM LEADER E DIRETOR

                const typeNotificationProspection = await TypeNotification.create({idSector:48, idModuleNotification: 1})
                
                const teamLeader = Number(await this.getTeamLeaderProspection(idProspection))
                const actionTeamLeader = await ActionNotification.create({title: title, message: message, idUser: teamLeader, idTypeNotification: typeNotificationProspection.id, idDetailNotification: idDetail}, {transaction: transactionNotification}) 
                await ProspectionNotification.create({idActionNotification:actionTeamLeader.id, idProspection:idProspection}, {transaction: transactionNotification})

                const actionDirector = await ActionNotification.create({title: title, message: message, idTypeNotification: typeNotificationProspection.id, idDetailNotification: idDetail}, {transaction: transactionNotification}) 
                await ProspectionNotification.create({idActionNotification:actionDirector.id, idProspection:idProspection}, {transaction: transactionNotification})

                //NOTIFICAÇÃO PARA TEAM LEADER MONITORAMENTO
                const typeNotificationMonitoring = await TypeNotification.create({idSector:48, idModuleNotification: 2})
                const teamLeaderMonitoring = Number(await this.getTeamLeaderMonitoring(idProspection))
                
                const actionTeamLeaderMonitoring = await ActionNotification.create({title: title, message: message, idUser: teamLeaderMonitoring, idTypeNotification: typeNotificationMonitoring.id, idDetailNotification: 2}, {transaction: transactionNotification})
                await MonitoringNotification.create({idActionNotification:actionTeamLeaderMonitoring.id, idMonitoring:idMonitoring.id}, {transaction: transactionNotification})
            }

        } 
        catch( error) {
            throw error
        }
    }

    async monitoringNotification(idMonitoring: number, idDetail: number, idAnalist: number, typeNotificationMonitoring: number,title: string, message: string, transactionNotification: Transaction) {

        try {

            if(typeNotificationMonitoring == 1) { // ENVIO NOTIFICAÇÃO PARA ANALISTA ( 1:SELECIONADO PARA MONITORAMENTO)

                const typeNotification = await TypeNotification.create({idSector:48, idModuleNotification: 2})
                const actionAnalistMonitoring = await ActionNotification.create({title: title, message: message, idUser: idAnalist, idTypeNotification: typeNotification.id, idDetailNotification: idDetail}, {transaction: transactionNotification}) 
                await MonitoringNotification.create({idActionNotification:actionAnalistMonitoring.id, idMonitoring:idMonitoring}, {transaction: transactionNotification})
            }

        }
        catch (error) {
            throw error
        }
    }

    async createMessage(idProspection: number, typeMessage: number, idUser?: number) {

        if(typeMessage === 1) {

            const nameAnalist = await User.findOne({ where: {id: idUser}})
            const instagramInfluencer = await this.getInstagramInfluencer(idProspection)
            const message: any = {
                requestApproval:`Analista ${nameAnalist?.name} solicita a aprovação da negociação da prospecção ${instagramInfluencer?.instagramName}`,
                aprovalPayment: `Analista ${nameAnalist?.name} solicita a aprovação dos dados de pagamento da prospecção ${instagramInfluencer?.instagramName}`,
                signatureContract: `Contrato da prospecção ${instagramInfluencer?.instagramName} assinado pelo Analista ${nameAnalist?.name}`
            }
            return message

        } else if(typeMessage === 2) {

            const instagramInfluencer = await this.getInstagramInfluencer(idProspection)
            const message = {
                approval: `Negociação Prospecção ${instagramInfluencer?.instagramName} Aprovada`,
                repproval: `Negociação Prospecção ${instagramInfluencer?.instagramName} Reprovada`,
                sendDoc: `Documentação Prospecção ${instagramInfluencer?.instagramName} Enviada`,
                validateContract: `Contrato Prospecção ${instagramInfluencer?.instagramName} Aprovado pelo Jurídico`,
            }
            return message
        }
    }

    // DELETE

    async deleteNotification(idActionNotification: number) {

        try {

            await ActionNotification.destroy({where: {id: idActionNotification}})

            return
        }
        catch(error) {
            throw error
        }
    }

}

export default new NotificationService()
