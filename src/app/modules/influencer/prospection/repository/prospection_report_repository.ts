import { QueryTypes } from 'sequelize';
import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionReportRepository {

    async getAllMappedProspection(query: string, idUser: number){

        try{

            let queryFixed =`SELECT count(DISTINCT prospection_influencer.id, influencer.id, status_prospection_influencer.id , status_prospection_influencer.description) AS "total" 
                from prospection_influencer
                inner join influencer on prospection_influencer.id_influencer = influencer.id
                left join prospection_work_influencer on prospection_work_influencer.id_prospection = prospection_influencer.id
                inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
                inner join status_prospection_influencer on process_prospection_influencer.id_status = status_prospection_influencer.id 
                inner join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection
                inner join user on prospection_user_actual_influencer.id_user = user.id 
                inner join product_prospection_influencer on prospection_influencer.id = product_prospection_influencer.id_prospection
                WHERE `;        

            if(idUser > 0) queryFixed += `prospection_user_actual_influencer.id_user = ${idUser} and `;

            const queryComplete = queryFixed.concat(query).concat(' and process_prospection_influencer.id_status >=1');
            
            let mapped = await sequelize.query(queryComplete, { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties[0];
            });
            
            return mapped;
            
        }catch(error){
            throw error;
        }

    }

    async getAllSignedProspection(query: string, idUser: number){

        try{

            let queryFixed =`SELECT count(DISTINCT prospection_influencer.id, influencer.id, status_prospection_influencer.id , status_prospection_influencer.description) AS "total" 
            from prospection_influencer
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            left join prospection_work_influencer on prospection_work_influencer.id_prospection = prospection_influencer.id
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join status_prospection_influencer on process_prospection_influencer.id_status = status_prospection_influencer.id 
            inner join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection
            inner join user on prospection_user_actual_influencer.id_user = user.id 
            inner join product_prospection_influencer on prospection_influencer.id = product_prospection_influencer.id_prospection
            WHERE `;

            if(idUser > 0) queryFixed += `prospection_user_actual_influencer.id_user = ${idUser} and `;

            const queryComplete = queryFixed.concat(query).concat(' and process_prospection_influencer.id_status >= 33');
            
            let mapped = await sequelize.query(queryComplete, { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties[0];
            });
            
            return mapped;
            
        }catch(error){
            throw error;
        }

        

    }

    async getAllValueSignedProspection(query: string, idUser: number){

        try{

            let queryFixed =`SELECT distinct sum(prospection_work_influencer.value) AS "total" 
            from prospection_influencer
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            left join prospection_work_influencer on prospection_work_influencer.id_prospection = prospection_influencer.id
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join status_prospection_influencer on process_prospection_influencer.id_status = status_prospection_influencer.id 
            inner join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection
            inner join user on prospection_user_actual_influencer.id_user = user.id 
            inner join product_prospection_influencer on prospection_influencer.id = product_prospection_influencer.id_prospection
            WHERE `;

            if(idUser > 0) queryFixed += `prospection_user_actual_influencer.id_user = ${idUser} and `;

            const queryComplete = queryFixed.concat(query).concat(' and process_prospection_influencer.id_status >= 33');
            
            let mapped = await sequelize.query(queryComplete, { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties[0];
            });
            
            return mapped;
            
        }catch(error){
            throw error;
        }

    }

    async getAllMediaValueSignedProspection(query: string, idUser: number){

        try{

            let queryFixed =`SELECT distinct sum(prospection_work_influencer.media_value) AS "total" 
            from prospection_influencer
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            left join prospection_work_influencer on prospection_work_influencer.id_prospection = prospection_influencer.id
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join status_prospection_influencer on process_prospection_influencer.id_status = status_prospection_influencer.id 
            inner join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection
            inner join user on prospection_user_actual_influencer.id_user = user.id 
            inner join product_prospection_influencer on prospection_influencer.id = product_prospection_influencer.id_prospection
            WHERE `;

            if(idUser > 0) queryFixed += `prospection_user_actual_influencer.id_user = ${idUser} and`;

            const queryComplete = queryFixed.concat(query).concat(' and process_prospection_influencer.id_status >= 33');
            
            let mapped = await sequelize.query(queryComplete, { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties[0];
            });
            
            return mapped;
            
        }catch(error){
            throw error;
        }

    }

}

export default new ProspectionReportRepository();