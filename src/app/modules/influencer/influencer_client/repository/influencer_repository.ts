import { QueryTypes } from 'sequelize';
import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class InfluencerRepository {

    async influencersAvailable(){

        try{
            const influencersList = await sequelize.query(`SELECT inf.id, inf.name, inf.instagram_name AS "instagramName", 
            track_followers_influencer.id AS "idTrackFollowers", track_followers_influencer.description AS "descriptionTrackFollowers",
            segment_influencer.id AS "idSegment", segment_influencer.name AS "nameSegment",
            segment_secondary_influencer.id AS "idSegmentSecondary", segment_secondary_influencer.name AS "nameSegmentSecondary"
            FROM influencer inf
            inner join track_followers_influencer on inf.id_track_followers = track_followers_influencer.id
            inner join segment_influencer on inf.id_segment = segment_influencer.id
            inner join segment_influencer AS segment_secondary_influencer on inf.id_segment_secondary = segment_secondary_influencer.id`, { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return influencersList;
        }catch(error){
            throw error;
        }
    }

    async influencersAvailableByName(name: string){

        try{
            const influencersList = await sequelize.query(`SELECT inf.id, inf.name, inf.instagram_name AS "instagramName", 
            track_followers_influencer.id AS "idTrackFollowers", track_followers_influencer.description AS "descriptionTrackFollowers",
            segment_influencer.id AS "idSegment", segment_influencer.name AS "nameSegment",
            segment_secondary_influencer.id AS "idSegmentSecondary", segment_secondary_influencer.name AS "nameSegmentSecondary"
            FROM influencer inf
            inner join track_followers_influencer on inf.id_track_followers = track_followers_influencer.id
            inner join segment_influencer on inf.id_segment = segment_influencer.id
            inner join segment_influencer AS segment_secondary_influencer on inf.id_segment_secondary = segment_secondary_influencer.id
            WHERE inf.name like '%${name}%' or inf.instagram_name like '%${name}%';`, { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return influencersList;
        }catch(error){
            throw error;
        }
    }

    async squadsByInfluencer(idInfluencer: number){

        try{
            const squadsInfluencersList = await sequelize.query(`SELECT squad_influencer.id, squad_influencer.name from prospection_influencer
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            inner join squad_influencer on prospection_influencer.id_squad = squad_influencer.id
            WHERE influencer.id = :idInfluencer`, { replacements: { idInfluencer: idInfluencer }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return squadsInfluencersList;
        }catch(error){
            throw error;
        }
    }

    async productsUsedByInfluencer(idInfluencer: number){

        try{
            const productsInfluencersList = await sequelize.query(`SELECT product_influencer.id, product_influencer.name from product_influencer
            inner join product_prospection_influencer on product_influencer.id = product_prospection_influencer.id_product
            inner join prospection_influencer on product_prospection_influencer.id_prospection = prospection_influencer.id
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            WHERE prospection_influencer.id_influencer = :idInfluencer and process_prospection_influencer.id_status not in(5,6);`, { replacements: { idInfluencer: idInfluencer }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return productsInfluencersList;
        }catch(error){
            throw error;
        }
    }

    async productsUsedByInfluencerProspection(idInfluencer: number, idProspection: number){

        try{
            const productsInfluencersList = await sequelize.query(`SELECT product_influencer.id, product_influencer.name from product_influencer
            inner join product_prospection_influencer on product_influencer.id = product_prospection_influencer.id_product
            inner join prospection_influencer on product_prospection_influencer.id_prospection = prospection_influencer.id
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            WHERE prospection_influencer.id_influencer = :idInfluencer and process_prospection_influencer.id_status not in(5,6) and process_prospection_influencer.id_prospection <> :idProspection;`, { replacements: { idInfluencer: idInfluencer, idProspection: idProspection }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return productsInfluencersList;
        }catch(error){
            throw error;
        }
    }

    async productsByProspection(idProspection: number){

        try{
            const productsInfluencersList = await sequelize.query(`SELECT product_influencer.name 
            from product_prospection_influencer
            inner join product_influencer on product_prospection_influencer.id_product = product_influencer.id
            WHERE product_prospection_influencer.id_prospection = :idProspection;`, { replacements: { idProspection: idProspection }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return productsInfluencersList;
        }catch(error){
            throw error;
        }
    }

    async userAndStatusUsedProspection(idInfluencer: number){

        try{
            const productsInfluencersList = await sequelize.query(`SELECT user.name, status_prospection_influencer.description AS 'status', process_prospection_influencer.id_prospection AS 'idProspection'
            from process_prospection_influencer
            inner join prospection_influencer on process_prospection_influencer.id_prospection = prospection_influencer.id
            inner join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection
            inner join status_prospection_influencer on process_prospection_influencer.id_status = status_prospection_influencer.id
            inner join user on prospection_user_actual_influencer.id_user = user.id
            WHERE prospection_influencer.id_influencer = :idInfluencer and process_prospection_influencer.id_status not in(5,6);`, { replacements: { idInfluencer: idInfluencer }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return productsInfluencersList;
        }catch(error){
            throw error;
        }
    }

    async processProspectionInfluencer(idInfluencer: number){

        try{
            const processList = await sequelize.query(`SELECT distinct process_prospection_influencer.id_status AS "status"
            from prospection_influencer
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            left join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            WHERE prospection_influencer.id_influencer = :idInfluencer`, { replacements: { idInfluencer: idInfluencer }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return processList;
        }catch(error){
            throw error;
        }
    }

    async detailProspectionByInfluencer(idInfluencer: number){

        try{
            const influencerList = await sequelize.query(`SELECT user.name, status_prospection_influencer.description from prospection_influencer
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join status_prospection_influencer on process_prospection_influencer.id_status = status_prospection_influencer.id
            inner join prospection_user_actual_influencer on process_prospection_influencer.id_prospection = prospection_user_actual_influencer.id_prospection
            inner join user on prospection_user_actual_influencer.id_user = user.id
            WHERE prospection_influencer.id_influencer = :idInfluencer`, { replacements: { idInfluencer: idInfluencer }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return influencerList;
        }catch(error){
            throw error;
        }
    }

}

export default new InfluencerRepository();