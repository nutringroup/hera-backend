import { QueryTypes } from "sequelize";
import SequelizeConnect from "../../../../config/sequelize_request";
const sequelize = SequelizeConnect.sequelizeConnect;

class NotificationRepository {

    async getNotification(idSector: number) {
        try{
            const userNotification = await sequelize.query(`select action_notification.id as idAction, action_notification.title, action_notification.message, detail_notification.id as idDetail 
            from action_notification 
            inner join type_notification on action_notification.id_type_notification = type_notification.id 
            inner join detail_notification on action_notification.id_detail_notification = detail_notification.id and type_notification.id_sector = :idSector;`,
              { replacements: { idSector: idSector }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
            return userNotification;

        }catch(error){
            throw error;
        }
    }

    async teamLeaderProspection (idProspection: number) {
        try{
            const teamLeader = await sequelize.query(`select sq.id_team_leader as idTeamLeader from squad_influencer sq inner join
             prospection_influencer on prospection_influencer.id_squad = sq.id and prospection_influencer.id = :idProspection;`,
              { replacements: { idProspection: idProspection }, type: QueryTypes.SELECT })
            .then(function(properties:any) {
                return properties[0].idTeamLeader;
            });
            return teamLeader;

        }catch(error){
            throw error;
        }
    }

    async teamLeaderMonitoring (idProspection: number) {
        try{
            const teamLeader = await sequelize.query(`select sq.id_team_leader_monitoring as idTeamLeaderMonitoring from squad_influencer sq inner join
             prospection_influencer on prospection_influencer.id_squad = sq.id and prospection_influencer.id = :idProspection;`,
              { replacements: { idProspection: idProspection }, type: QueryTypes.SELECT })
            .then(function(properties:any) {
                return properties[0].idTeamLeaderMonitoring;
            });
            return teamLeader;

        }catch(error){
            throw error;
        }
    }

    async getNotificationInfluencer(idUser: number, idSector: number, idModuleNotification: number) {
        try{
            const userNotification = await sequelize.query(`select action_notification.id as idAction, action_notification.title, action_notification.message, detail_notification.id as idDetail from action_notification inner join
            type_notification on action_notification.id_type_notification = type_notification.id inner join detail_notification on action_notification.id_detail_notification 
            = detail_notification.id and action_notification.id_user = :idUser and type_notification.id_sector = :idSector and type_notification.id_module_notification = :idModuleNotification;`,
              { replacements: { idUser: idUser, idSector: idSector , idModuleNotification: idModuleNotification}, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
            return userNotification;

        }catch(error){
            throw error;
        }
    }

    async getNotificationInfluencerDirector(idSector: number, idModuleNotification: number) {
        try{
            const userNotification = await sequelize.query(`select action_notification.id as idAction, action_notification.title, action_notification.message, detail_notification.id as idDetail 
            from action_notification 
            inner join type_notification on action_notification.id_type_notification = type_notification.id 
            inner join detail_notification on action_notification.id_detail_notification = detail_notification.id 
            and type_notification.id_sector = :idSector and type_notification.id_module_notification = :idModuleNotification 
            and (action_notification.id_user is null or action_notification.id_user = '' )`,
              { replacements: { idSector: idSector , idModuleNotification: idModuleNotification}, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
            return userNotification;

        }catch(error){
            throw error;
        }
    }
}

export default new NotificationRepository()