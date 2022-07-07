import { QueryTypes } from 'sequelize';

import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionAdditiveTermRepository {

    async getAdditiveTerm(){

        try{
            const prospections = await sequelize.query(`select ad.id as idAdditiveTerm, ad.id_prospection as idProspection, influencer.id as idInfluencer, influencer.name as influencerName, influencer.instagram_name as instagramName, reason.name as reason, status.id as idStatus, status.name as statusName, ad.description, ad.observation, ad.url_file_send as urlFileSend from additive_term_prospection_influencer ad inner join
            reason_additive_term_prospection_influencer reason on ad.id_reason_additive_term = reason.id inner join status_additive_term_prospection_influencer
            status on ad.id_status_additive_term = status.id inner join prospection_influencer on prospection_influencer.id 
            = ad.id_prospection inner join influencer on influencer.id = prospection_influencer.id_influencer;`, { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async getAdditiveTermInfluencerAnalist(idProspection: number){

        try{
            const prospections = await sequelize.query(`select ad.id as idAdditiveTerm, ad.id_prospection as idProspection, influencer.name as influencerName, influencer.instagram_name as instagramName, reason.name as reason, status.id as idStatus, status.name as statusName, ad.description, ad.observation, ad.url_file_send as urlFileSend from additive_term_prospection_influencer ad inner join
            reason_additive_term_prospection_influencer reason on ad.id_reason_additive_term = reason.id inner join status_additive_term_prospection_influencer
            status on ad.id_status_additive_term = status.id inner join prospection_influencer on prospection_influencer.id 
            = ad.id_prospection inner join influencer on influencer.id = prospection_influencer.id_influencer and ad.id_prospection = :idProspection;`, {replacements: { idProspection: idProspection }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async getAdditiveTermByUserAnalist(idUser: number){

        try{
            const prospections = await sequelize.query(`select ad.id as idAdditiveTerm, ad.id_prospection as idProspection, influencer.id as idInfluencer, influencer.name as influencerName, influencer.instagram_name as instagramName, reason.name as reason, status.id as idStatus, status.name as statusName, ad.description, ad.url_file_send as urlFileSend,
            (select case when prospection_user_actual_influencer.id_user = :idUser then true else false end) AS "userProspection",
            (select case when monitoring_user_actual_influencer.id_user = :idUser then true else false end) AS "userMonitoring"
            from additive_term_prospection_influencer ad
            inner join reason_additive_term_prospection_influencer reason on ad.id_reason_additive_term = reason.id
            inner join status_additive_term_prospection_influencer
                        status on ad.id_status_additive_term = status.id
            inner join prospection_influencer on ad.id_prospection = prospection_influencer.id
            left join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection
            left join user on prospection_user_actual_influencer.id_user = user.id
            inner join monitoring_influencer on prospection_influencer.id = monitoring_influencer.id_prospection
            left join monitoring_user_actual_influencer on monitoring_influencer.id = monitoring_user_actual_influencer.id_monitoring
            left join user AS user2 on monitoring_user_actual_influencer.id_user = user2.id
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            where user2.id = :idUser or user.id = :idUser;`, {replacements: { idUser: idUser}, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async getAdditiveTermDocumentation(idProspection: number){

        try{
            const prospections = await sequelize.query(`select adDoc.url as urlAdditiveTerm from additive_term_documentation_prospection_influencer adDoc inner join
            additive_term_prospection_influencer ad on adDoc.id_additive_term = ad.id and ad.id_prospection = :idProspection;`, {replacements: { idProspection: idProspection}, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

}

export default new ProspectionAdditiveTermRepository()