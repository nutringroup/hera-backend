import { QueryTypes } from 'sequelize';

import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionRepository {

    async getAll(idSquad: number){

        try{
            const prospections = await sequelize.query(`SELECT prospection_influencer.id, influencer.id AS "idInfluencer", influencer.instagram_name AS "instagramName", user.name, status_prospection_influencer.id AS "status" , status_prospection_influencer.description AS "statusName" 
            from prospection_influencer
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join status_prospection_influencer on process_prospection_influencer.id_status = status_prospection_influencer.id 
            inner join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection
            inner join user on prospection_user_actual_influencer.id_user = user.id 
            WHERE prospection_influencer.id_squad = :idSquad order by prospection_influencer.id desc`, { replacements: { idSquad: idSquad }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async getAllByFilterProspection(query: string){

        try{

            const queryFixed = `SELECT distinct prospection_influencer.id, influencer.id AS "idInfluencer", influencer.instagram_name AS "instagramName", user.name, status_prospection_influencer.id AS "status" , status_prospection_influencer.description AS "statusName" 
            from prospection_influencer
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            left join prospection_work_influencer on prospection_work_influencer.id_prospection = prospection_influencer.id
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join status_prospection_influencer on process_prospection_influencer.id_status = status_prospection_influencer.id 
            inner join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection
            inner join user on prospection_user_actual_influencer.id_user = user.id 
            inner join product_prospection_influencer on prospection_influencer.id = product_prospection_influencer.id_prospection
            WHERE `;
            
            var prospections = await sequelize.query(queryFixed.concat(query), { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
            

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async getAllByUser(idUser: number, idSquad: number){

        try{
            const prospections = await sequelize.query(`SELECT prospection_influencer.id, influencer.id AS "idInfluencer", influencer.instagram_name AS "instagramName", status_prospection_influencer.id AS "status", status_prospection_influencer.description AS "statusName"
            from prospection_influencer
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join status_prospection_influencer on process_prospection_influencer.id_status = status_prospection_influencer.id 
            inner join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection
			WHERE prospection_user_actual_influencer.id_user = :idUser and prospection_influencer.id_squad = :idSquad order by prospection_influencer.id desc`, { replacements: { idUser: idUser, idSquad: idSquad }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async getAllByUserWithFilter(idUser: number, idSquad: number, status: number){

        try{
            const prospections = await sequelize.query(`SELECT prospection_influencer.id, influencer.id AS "idInfluencer", influencer.instagram_name AS "instagramName", status_prospection_influencer.id AS "status", status_prospection_influencer.description AS "statusName"
            from prospection_influencer
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join status_prospection_influencer on process_prospection_influencer.id_status = status_prospection_influencer.id 
            inner join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection
			WHERE prospection_user_actual_influencer.id_user = :idUser and prospection_influencer.id_squad = :idSquad and process_prospection_influencer.id_status = :status order by prospection_influencer.id desc`, { replacements: { idUser: idUser, idSquad: idSquad, status: status }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async getTeamLeaderSquad(idUser: number, idSquad: number){

        try{
            const prospections = await sequelize.query(`SELECT * from squad_influencer WHERE id = :idSquad and id_team_leader = :idUser`, { replacements: { idUser: idUser, idSquad: idSquad }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            if(prospections.length > 0)
                return true;
            else
                return false;
            
        }catch(error){
            throw error;
        }

    }

    async getUserSquad(idUser: number, idSquad: number){

        try{
            const prospections = await sequelize.query(`SELECT * from squad_influencer 
            inner join squad_user_prospection on squad_influencer.id = squad_user_prospection.id_squad
            WHERE squad_user_prospection.id_squad = :idSquad and squad_user_prospection.id_user_prospection = :idUser`, { replacements: { idUser: idUser, idSquad: idSquad }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            if(prospections.length > 0)
                return true;
            else
                return false;
            
        }catch(error){
            throw error;
        }

    }

    async responsableUserProspection(idProspection: number){

        try{
            const user = await sequelize.query(`SELECT user.name from prospection_user_actual_influencer
            inner join user on prospection_user_actual_influencer.id_user = user.id
            WHERE prospection_user_actual_influencer.id_prospection = :idProspection`, { replacements: { idProspection: idProspection }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties[0];
            });

            return user;
            
        }catch(error){
            throw error;
        }

    }

    async getProductsByProspection(idProspection: number){

        try{
            const products = await sequelize.query(`SELECT product_influencer.id, product_influencer.name from product_influencer
            inner join product_prospection_influencer on product_influencer.id = product_prospection_influencer.id_product
            inner join prospection_influencer on product_prospection_influencer.id_prospection = prospection_influencer.id
            WHERE prospection_influencer.id = :idProspection;`, { replacements: { idProspection: idProspection }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return products;
            
        }catch(error){
            throw error;
        }

    }

    async getMediaValueByProspection(idProspection: number){

        try{
            const products = await sequelize.query(`SELECT product_influencer.id, product_influencer.name from product_influencer
            inner join product_prospection_influencer on product_influencer.id = product_prospection_influencer.id_product
            inner join prospection_influencer on product_prospection_influencer.id_prospection = prospection_influencer.id
            WHERE prospection_influencer.id = :idProspection;`, { replacements: { idProspection: idProspection }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return products;
            
        }catch(error){
            throw error;
        }

    }

    async userActualProspection(idUser: number, idSquad: number){

        try{
            const prospections = await sequelize.query(`SELECT prospection_influencer.id, user.name
            from prospection_influencer
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection
            inner join user on prospection_user_actual_influencer.id_user = user.id
            WHERE process_prospection_influencer.id_status not in(5,6) and user.id = :idUser and prospection_influencer.id_squad = :idSquad`, { replacements: { idUser: idUser, idSquad: idSquad }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async userChangedProspection(idProspection: number){

        try{
            const prospections = await sequelize.query(`SELECT user.id, user.name FROM prospection_user_other_influencer
            inner join user on prospection_user_other_influencer.id_user = user.id
            WHERE prospection_user_other_influencer.id_prospection = :idProspection`, { replacements: { idProspection: idProspection }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async userProspectionAll(){

        try{
            const users = await sequelize.query(`SELECT distinct user.id, user.name FROM prospection_influencer
            inner join squad_influencer on prospection_influencer.id_squad = squad_influencer.id
            inner join squad_user_prospection on squad_influencer.id = squad_user_prospection.id_squad
            inner join user on squad_user_prospection.id_user_prospection = user.id
            order by user.name`, { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return users;
            
        }catch(error){
            throw error;
        }

    }

    // rotine of legal

    async getAllByLegal(){

        try{
            const prospections = await sequelize.query(`SELECT prospection_influencer.id, user.name, influencer.name AS "influencer", influencer.instagram_name AS "instagram",status_prospection_influencer.id AS "status" , status_prospection_influencer.description AS "statusName" 
            from prospection_influencer
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join status_prospection_influencer on process_prospection_influencer.id_status = status_prospection_influencer.id 
            inner join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection
            inner join user on prospection_user_actual_influencer.id_user = user.id
            WHERE process_prospection_influencer.id_status >= 19 order by prospection_influencer.id desc`, { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async getAllByLegalByFilter(status: number){

        try{
            const prospections = await sequelize.query(`SELECT prospection_influencer.id, user.name, influencer.name AS "influencer", influencer.instagram_name AS "instagram", status_prospection_influencer.id AS "status" , status_prospection_influencer.description AS "statusName" 
            from prospection_influencer
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join status_prospection_influencer on process_prospection_influencer.id_status = status_prospection_influencer.id 
            inner join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection
            inner join user on prospection_user_actual_influencer.id_user = user.id
            WHERE process_prospection_influencer.id_status >= 19 and process_prospection_influencer.id_status = :status order by prospection_influencer.id desc`, { replacements: { status: status }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    // ******** rotine of financial ********

    async getPaymentsFinancial(month: string){

        try{
            const prospections = await sequelize.query(`SELECT prospection_financial_influencer.id, prospection_influencer.id AS "idProspection", prospection_influencer.cod , influencer.name AS nameInfluencer,
            influencer.instagram_name AS "instagramName", prospection_financial_influencer.date_payment AS "datePayment", prospection_work_influencer.media_value AS "value"
            FROM prospection_influencer
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join prospection_financial_influencer on prospection_influencer.id = prospection_financial_influencer.id_prospection
            inner join prospection_work_influencer on prospection_influencer.id = prospection_work_influencer.id_prospection
            WHERE process_prospection_influencer.id_status = 33 
            and (prospection_financial_influencer.confirm_payment <> '1' or prospection_financial_influencer.confirm_payment is null)
            and SUBSTRING(CAST(prospection_financial_influencer.date_payment AS char), 6, 2) = :month
            and (select prospection_financial_request_influencer.id from prospection_financial_request_influencer where id_prospection_financial = prospection_financial_influencer.id) is null
            order by prospection_financial_influencer.date_payment`, { replacements: { month: month }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async getPaymentsPaid(month: string){

        try{
            const prospections = await sequelize.query(`SELECT prospection_financial_influencer.id, prospection_influencer.id AS "idProspection", 
            influencer.instagram_name AS "instagramName", prospection_financial_influencer.date_payment AS "datePayment", prospection_work_influencer.media_value AS "value",
            prospection_financial_influencer.value_payment AS "valuePayment", prospection_financial_influencer.payment_proof AS "paymentProof"
            FROM prospection_influencer
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join prospection_financial_influencer on prospection_influencer.id = prospection_financial_influencer.id_prospection
            inner join prospection_work_influencer on prospection_influencer.id = prospection_work_influencer.id_prospection
            WHERE SUBSTRING(CAST(prospection_financial_influencer.date_payment AS char), 6, 2) = :month and prospection_financial_influencer.confirm_payment = '1'
            order by prospection_financial_influencer.date_payment`, { replacements: { month: month }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async getPaymentsPaidInfluencer(month: string, idUser: number, isDirector: boolean){

        try{
            if(isDirector){
                var prospections = await sequelize.query(`SELECT prospection_financial_influencer.id, prospection_influencer.id AS "idProspection", 
                influencer.instagram_name AS "instagramName", prospection_financial_influencer.date_payment AS "datePayment", prospection_work_influencer.media_value AS "value",
                prospection_financial_influencer.value_payment AS "valuePayment", prospection_financial_influencer.payment_proof AS "paymentProof"
                FROM prospection_influencer
                inner join influencer on prospection_influencer.id_influencer = influencer.id
                inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
                inner join prospection_financial_influencer on prospection_influencer.id = prospection_financial_influencer.id_prospection
                inner join prospection_work_influencer on prospection_influencer.id = prospection_work_influencer.id_prospection
                WHERE SUBSTRING(CAST(prospection_financial_influencer.date_payment AS char), 6, 2) = :month and prospection_financial_influencer.confirm_payment = '1'
                order by prospection_financial_influencer.date_payment`, { replacements: { month: month }, type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties;
                });
            } else {
                var prospections = await sequelize.query(`SELECT prospection_financial_influencer.id, prospection_influencer.id AS "idProspection", 
                influencer.instagram_name AS "instagramName", prospection_financial_influencer.date_payment AS "datePayment", prospection_work_influencer.media_value AS "value",
                prospection_financial_influencer.value_payment AS "valuePayment", prospection_financial_influencer.payment_proof AS "paymentProof"
                FROM prospection_influencer
                inner join influencer on prospection_influencer.id_influencer = influencer.id
                inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
                inner join prospection_financial_influencer on prospection_influencer.id = prospection_financial_influencer.id_prospection
                inner join prospection_work_influencer on prospection_influencer.id = prospection_work_influencer.id_prospection
                inner join squad_influencer as squad on squad.id = prospection_influencer.id_squad
                WHERE SUBSTRING(CAST(prospection_financial_influencer.date_payment AS char), 6, 2) = :month and prospection_financial_influencer.confirm_payment = '1'
                and (squad.id_team_leader_monitoring = :idUser || squad.id_team_leader = :idUser)
                order by prospection_financial_influencer.date_payment;`, { replacements: { month: month, idUser: idUser }, type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties;
                });
            }

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async getPaymentsPaidInfluencerAnalyst(month: string, idUser: number){

        try{
            const prospections = await sequelize.query(`SELECT prospection_financial_influencer.id, prospection_influencer.id AS "idProspection", 
            influencer.instagram_name AS "instagramName", prospection_financial_influencer.date_payment AS "datePayment", prospection_work_influencer.media_value AS "value",
            prospection_financial_influencer.value_payment AS "valuePayment", prospection_financial_influencer.payment_proof AS "paymentProof"
            FROM prospection_influencer
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join prospection_financial_influencer on prospection_influencer.id = prospection_financial_influencer.id_prospection
            inner join prospection_work_influencer on prospection_influencer.id = prospection_work_influencer.id_prospection
            inner join prospection_user_actual_influencer on prospection_user_actual_influencer.id_prospection = prospection_influencer.id
            inner join monitoring_influencer on prospection_influencer.id = monitoring_influencer.id_prospection
            inner join monitoring_user_actual_influencer on monitoring_influencer.id = monitoring_user_actual_influencer.id_monitoring
            WHERE SUBSTRING(CAST(prospection_financial_influencer.date_payment AS char), 6, 2) = :month and prospection_financial_influencer.confirm_payment = '1'
            and (prospection_user_actual_influencer.id_user = :idUser || monitoring_user_actual_influencer.id_user = :idUser)
            order by prospection_financial_influencer.date_payment;`, { replacements: { month: month, idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async detailsPayments(idProspection: number){

        try{
            const prospections = await sequelize.query(`SELECT id, date_payment AS "datePayment", confirm_payment AS "confirmPayment", distraction,
            date_payment_receive AS "datePaymentReceive", date_payment_expected AS "datePaymentExpected", nf_file AS "nfFile"
            from prospection_financial_influencer WHERE id_prospection = :idProspection`, { replacements: { idProspection: idProspection }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async getPaymentsRequest(){

        try{
            const prospections = await sequelize.query(`SELECT prospection_financial_influencer.id, prospection_financial_request_influencer.id As "idPaymentRequest",
             prospection_influencer.id AS "idProspection", prospection_influencer.cod , influencer.name AS nameInfluencer, influencer.instagram_name AS "instagramName", 
            prospection_financial_influencer.date_payment AS "datePayment", prospection_work_influencer.media_value AS "value", 
            prospection_financial_request_influencer.confirm_tl_monitoring AS "confirmMonitoring", prospection_financial_request_influencer.confirm_tl_prospection AS "confirmProspection"
            FROM prospection_financial_request_influencer
            inner join prospection_financial_influencer on prospection_financial_influencer.id = prospection_financial_request_influencer.id_prospection_financial
            inner join prospection_influencer on prospection_financial_influencer.id_prospection = prospection_influencer.id
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            inner join prospection_work_influencer on prospection_influencer.id = prospection_work_influencer.id_prospection
            order by prospection_financial_influencer.date_payment`, { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async getPaymentsRequestTeamLeader(idUser: number, isDirector: boolean){

        try{

            if(isDirector){
                var prospections = await sequelize.query(`SELECT prospection_financial_influencer.id, prospection_financial_request_influencer.id AS "idPaymentRequest", prospection_influencer.id AS "idProspection", 
                influencer.instagram_name AS "instagramName", prospection_financial_influencer.date_payment AS "datePayment", prospection_work_influencer.media_value AS "value",
                prospection_financial_request_influencer.confirm_tl_monitoring AS "confirmMonitoring", prospection_financial_request_influencer.confirm_tl_prospection AS "confirmProspection",
                true AS "isDirector", process_prospection_influencer.distraction
                FROM prospection_influencer
                inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
                inner join squad_influencer As squad on prospection_influencer.id_squad = squad.id
                inner join influencer on prospection_influencer.id_influencer = influencer.id	
                inner join prospection_financial_influencer on prospection_influencer.id = prospection_financial_influencer.id_prospection
                inner join prospection_financial_request_influencer on prospection_financial_influencer.id = prospection_financial_request_influencer.id_prospection_financial
                inner join prospection_work_influencer on prospection_influencer.id = prospection_work_influencer.id_prospection
                order by prospection_financial_influencer.date_payment`, { type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties;
                });
            }else{
                var prospections = await sequelize.query(`SELECT prospection_financial_influencer.id, prospection_financial_request_influencer.id AS "idPaymentRequest", prospection_influencer.id AS "idProspection", 
                influencer.instagram_name AS "instagramName", prospection_financial_influencer.date_payment AS "datePayment", prospection_work_influencer.media_value AS "value",
                prospection_financial_request_influencer.confirm_tl_monitoring AS "confirmMonitoring", prospection_financial_request_influencer.confirm_tl_prospection AS "confirmProspection",
                (SELECT CASE WHEN id_team_leader > 0 THEN true ELSE false END from squad_influencer WHERE id_team_leader = :idUser and id = squad.id) As "isTeamLeaderProspection",
                (SELECT CASE WHEN id_team_leader_monitoring > 0 THEN true ELSE false END from squad_influencer WHERE id_team_leader_monitoring = :idUser and id = squad.id) As "isTeamLeaderMonitoring",
                process_prospection_influencer.distraction
                FROM prospection_influencer
                inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
                inner join squad_influencer As squad on prospection_influencer.id_squad = squad.id
                inner join influencer on prospection_influencer.id_influencer = influencer.id	
                inner join prospection_financial_influencer on prospection_influencer.id = prospection_financial_influencer.id_prospection
                inner join prospection_financial_request_influencer on prospection_financial_influencer.id = prospection_financial_request_influencer.id_prospection_financial
                inner join prospection_work_influencer on prospection_influencer.id = prospection_work_influencer.id_prospection
                WHERE (squad.id_team_leader_monitoring = :idUser || squad.id_team_leader = :idUser)
                order by prospection_financial_influencer.date_payment`, { replacements: { idUser: idUser }, type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties;
                });
            }


            return prospections;
            
        }catch(error){
            throw error;
        }

    }

    async getLogChangedStatusProspection(idProspection: number){

        try{
            const prospections = await sequelize.query(`select logChange.id, logChange.description, proscProspection.updated_at as updatedAt from prospection_log_change_status_influencer logChange
            inner join process_prospection_influencer proscProspection where proscProspection.id_prospection = logChange.id_prospection and logChange.id_prospection = :idProspection;`, { replacements: { idProspection: idProspection }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
    
        }catch(error){
            throw error;
        }

    }

    async getPaymentsRequestAnalyst(idUser: number){

        try{

            var prospections = await sequelize.query(`SELECT prospection_financial_influencer.id, prospection_financial_request_influencer.id AS "idPaymentRequest", prospection_influencer.id AS "idProspection", 
            influencer.instagram_name AS "instagramName", prospection_financial_influencer.date_payment AS "datePayment", prospection_work_influencer.media_value AS "value",
            prospection_financial_request_influencer.confirm_tl_monitoring AS "confirmMonitoring", prospection_financial_request_influencer.confirm_tl_prospection AS "confirmProspection",
            (SELECT CASE WHEN id_team_leader > 0 THEN true ELSE false END from squad_influencer WHERE id_team_leader = :idUser and id = squad.id) As "isTeamLeaderProspection",
            (SELECT CASE WHEN id_team_leader_monitoring > 0 THEN true ELSE false END from squad_influencer WHERE id_team_leader_monitoring = :idUser and id = squad.id) As "isTeamLeaderMonitoring",
            process_prospection_influencer.distraction
            FROM prospection_influencer
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join squad_influencer As squad on prospection_influencer.id_squad = squad.id
            inner join influencer on prospection_influencer.id_influencer = influencer.id	
            inner join prospection_financial_influencer on prospection_influencer.id = prospection_financial_influencer.id_prospection
            inner join prospection_financial_request_influencer on prospection_financial_influencer.id = prospection_financial_request_influencer.id_prospection_financial
            inner join prospection_work_influencer on prospection_influencer.id = prospection_work_influencer.id_prospection 
            inner join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection 
            inner join monitoring_influencer on prospection_influencer.id = monitoring_influencer.id_prospection
            inner join monitoring_user_actual_influencer on monitoring_influencer.id = monitoring_user_actual_influencer.id_monitoring
            WHERE (prospection_user_actual_influencer.id_user = :idUser || monitoring_user_actual_influencer.id_user = :idUser)
            order by prospection_financial_influencer.date_payment;`, { replacements: { idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return prospections;
            
        }catch(error){
            throw error;
        }

    }

}

export default new ProspectionRepository();