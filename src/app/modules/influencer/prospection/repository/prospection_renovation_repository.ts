import { QueryTypes } from 'sequelize';

import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionRenovationRepository {

    async getAll(){

        try{
            const distractions = await sequelize.query(`SELECT prospection_renovation_influencer.id, prospection_renovation_influencer.url, 
            prospection_renovation_influencer.comment, prospection_renovation_influencer.id_prospection AS "idProspection",
            status_renovation_prospection_influencer.id AS "idStatus", status_renovation_prospection_influencer.description AS "statusName", influencer.name AS "influencerName", influencer.instagram_name AS "instagramName"
            from prospection_renovation_influencer
            inner join status_renovation_prospection_influencer on prospection_renovation_influencer.id_status_renovation = status_renovation_prospection_influencer.id
            inner join prospection_influencer on prospection_renovation_influencer.id_prospection = prospection_influencer.id
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            order by prospection_renovation_influencer.id desc`, { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return distractions;
            
        }catch(error){
            throw error;
        }

    }

    async getAllByTeamLeader(idUser: number){

        try{
            const distractions = await sequelize.query(`SELECT prospection_renovation_influencer.id, prospection_renovation_influencer.url, 
            prospection_renovation_influencer.comment, prospection_renovation_influencer.id_prospection AS "idProspection",
            status_renovation_prospection_influencer.id AS "idStatus", status_renovation_prospection_influencer.description AS "statusName", influencer.name AS "influencerName", influencer.instagram_name AS "instagramName"
            from prospection_renovation_influencer
            inner join status_renovation_prospection_influencer on prospection_renovation_influencer.id_status_renovation = status_renovation_prospection_influencer.id
            inner join prospection_influencer on prospection_renovation_influencer.id_prospection = prospection_influencer.id
            inner join squad_influencer on prospection_influencer.id_squad = squad_influencer.id
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            WHERE squad_influencer.id_team_leader = :idUser or squad_influencer.id_team_leader_monitoring = :idUser
            order by prospection_renovation_influencer.id desc`, { replacements: { idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return distractions;
            
        }catch(error){
            throw error;
        }

    }

    async getAllByUser(idUser: number){

        try{
            const distractions = await sequelize.query(`SELECT prospection_renovation_influencer.id, prospection_renovation_influencer.url, 
            prospection_renovation_influencer.comment, prospection_renovation_influencer.id_prospection AS "idProspection",
            status_renovation_prospection_influencer.id AS "idStatus", status_renovation_prospection_influencer.description AS "statusName", influencer.name AS "influencerName", influencer.instagram_name AS "instagramName",
            (select case when prospection_user_actual_influencer.id_user = :idUser then true else false end) AS "userProspection",
            (select case when monitoring_user_actual_influencer.id_user = :idUser then true else false end) AS "userMonitoring"
            from prospection_renovation_influencer
            inner join status_renovation_prospection_influencer on prospection_renovation_influencer.id_status_renovation = status_renovation_prospection_influencer.id
            inner join prospection_influencer on prospection_renovation_influencer.id_prospection = prospection_influencer.id
            left join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection
            left join user on prospection_user_actual_influencer.id_user = user.id
            inner join monitoring_influencer on prospection_influencer.id = monitoring_influencer.id_prospection
            left join monitoring_user_actual_influencer on monitoring_influencer.id = monitoring_user_actual_influencer.id_monitoring
            left join user AS user2 on monitoring_user_actual_influencer.id_user = user2.id
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            WHERE user2.id = :idUser or user.id = :idUser
            order by prospection_renovation_influencer.id desc;`, { replacements: { idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return distractions;
            
        }catch(error){
            throw error;
        }

    }

    async getAllByLegal(){

        try{
            const distractions = await sequelize.query(`SELECT prospection_renovation_influencer.id, prospection_renovation_influencer.url, 
            prospection_renovation_influencer.comment, prospection_renovation_influencer.id_prospection AS "idProspection",
            status_renovation_prospection_influencer.id AS "idStatus", status_renovation_prospection_influencer.description AS "statusName", influencer.name AS "influencerName", influencer.instagram_name AS "instagramName"
            from prospection_renovation_influencer
            inner join status_renovation_prospection_influencer on prospection_renovation_influencer.id_status_renovation = status_renovation_prospection_influencer.id
            inner join prospection_influencer on prospection_renovation_influencer.id_prospection = prospection_influencer.id
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            order by prospection_renovation_influencer.id desc;`, { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return distractions;
            
        }catch(error){
            throw error;
        }

    }

}

export default new ProspectionRenovationRepository();