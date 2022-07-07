import { QueryTypes } from 'sequelize';
import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class MonitoringRepository {

    async getAllMonitoring(idSquad: number) {

        try {

            const monitoring = await sequelize.query(`SELECT monitoring_influencer.id, prospection_influencer.id AS "idProspection", user.id AS "idUser", user.name AS "userName",
            influencer.name, influencer.instagram_name AS "instagramName", status_monitoring_influencer.id AS "status", status_monitoring_influencer.description AS "statusName"
            from monitoring_influencer
            inner join status_monitoring_influencer on monitoring_influencer.id_status = status_monitoring_influencer.id
            inner join prospection_influencer on monitoring_influencer.id_prospection = prospection_influencer.id
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            left join monitoring_user_actual_influencer on monitoring_influencer.id = monitoring_user_actual_influencer.id_monitoring
            left join user on monitoring_user_actual_influencer.id_user = user.id
            WHERE prospection_influencer.id_squad = :idSquad and monitoring_influencer.id_status in (1,2)
            order by monitoring_influencer.id DESC`, { replacements: { idSquad: idSquad }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return monitoring;
            
        } catch (error) {
            throw error;
        }

    }

    async getAllMonitoringByUser(idSquad: number, idUser: number) {

        try {

            const monitoring = await sequelize.query(`SELECT monitoring_influencer.id, prospection_influencer.id AS "idProspection", influencer.name, influencer.instagram_name AS "instagramName", status_monitoring_influencer.id AS "status", status_monitoring_influencer.description AS "statusName"
            from monitoring_influencer
            inner join status_monitoring_influencer on monitoring_influencer.id_status = status_monitoring_influencer.id
            inner join monitoring_user_actual_influencer on monitoring_influencer.id = monitoring_user_actual_influencer.id_monitoring
            inner join prospection_influencer on monitoring_influencer.id_prospection = prospection_influencer.id
            inner join influencer on prospection_influencer.id_influencer = influencer.id
            WHERE prospection_influencer.id_squad = :idSquad and monitoring_influencer.id_status = 2 and monitoring_user_actual_influencer.id_user = :idUser order by monitoring_influencer.id DESC`, { replacements: { idSquad: idSquad, idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return monitoring;
            
        } catch (error) {
            throw error;
        }

    }

    async getAllMonitoringByUserCount(idSquad: number, idUser: number) {

        try {

            const monitoring = await sequelize.query(`SELECT count(*) AS "total"
            from monitoring_influencer
            inner join monitoring_user_actual_influencer on monitoring_influencer.id = monitoring_user_actual_influencer.id_monitoring
            inner join prospection_influencer on monitoring_influencer.id_prospection = prospection_influencer.id
            WHERE prospection_influencer.id_squad = :idSquad and monitoring_influencer.id_status = 2 and monitoring_user_actual_influencer.id_user = :idUser order by monitoring_influencer.id DESC`, { replacements: { idSquad: idSquad, idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties[0];
            });

            return monitoring;
            
        } catch (error) {
            throw error;
        }

    }

    async getProductsByProspection(idProspection: number) {

        try {

            const products = await sequelize.query(`select product_influencer.name from product_prospection_influencer
            inner join product_influencer on product_prospection_influencer.id_product = product_influencer.id
            where product_prospection_influencer.id_prospection = :idProspection`, { replacements: { idProspection: idProspection }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            return products;
            
        } catch (error) {
            throw error;
        }

    }

    async isUserMonitoring(idMonitoring: number, idUser: number) {

        try {

            const monitoring = await sequelize.query(`SELECT monitoring_influencer.id from monitoring_influencer
            inner join monitoring_user_actual_influencer on monitoring_influencer.id = monitoring_user_actual_influencer.id_monitoring
            WHERE monitoring_influencer.id_status <> 1 and monitoring_influencer.id = :idMonitoring and monitoring_user_actual_influencer.id_user = :idUser`, { replacements: { idMonitoring: idMonitoring, idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            if(monitoring.length > 0){
                return true
            }else{
                return false;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async getAllRoadmapByUser(idMonitoring: number, status: number) {

        try {

            if(status === 0){
                var roadMap = await sequelize.query(`SELECT monitoring_roadmap_influencer.id, monitoring_roadmap_influencer.description, monitoring_roadmap_influencer.path, monitoring_roadmap_influencer.is_roadmap AS "isRoadmap",
                status_roadmap_monitoring_influencer.id AS "idStatus", status_roadmap_monitoring_influencer.description AS "statusName",
                monitoring_roadmap_influencer.id AS "idMonitoring", user.id AS "idUser", user.name AS "userName"
                from monitoring_roadmap_influencer
                inner join monitoring_influencer on monitoring_roadmap_influencer.id_monitoring = monitoring_influencer.id
                inner join monitoring_user_actual_influencer on monitoring_user_actual_influencer.id_monitoring = monitoring_influencer.id
                inner join user on user.id = monitoring_user_actual_influencer.id_user
                inner join status_roadmap_monitoring_influencer on monitoring_roadmap_influencer.status_roadmap = status_roadmap_monitoring_influencer.id
                WHERE monitoring_influencer.id = :idMonitoring order by monitoring_roadmap_influencer.id DESC`, { replacements: { idMonitoring: idMonitoring }, type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties;
                });
            }else{
                var roadMap = await sequelize.query(`SELECT monitoring_roadmap_influencer.id, monitoring_roadmap_influencer.description, monitoring_roadmap_influencer.path, monitoring_roadmap_influencer.is_roadmap AS "isRoadmap",
                status_roadmap_monitoring_influencer.id AS "idStatus", status_roadmap_monitoring_influencer.description AS "statusName",
                monitoring_roadmap_influencer.id AS "idMonitoring", user.id AS "idUser", user.name AS "userName"
                from monitoring_roadmap_influencer
                inner join monitoring_influencer on monitoring_roadmap_influencer.id_monitoring = monitoring_influencer.id
                inner join monitoring_user_actual_influencer on monitoring_user_actual_influencer.id_monitoring = monitoring_influencer.id
                inner join user on user.id = monitoring_user_actual_influencer.id_user
                inner join status_roadmap_monitoring_influencer on monitoring_roadmap_influencer.status_roadmap = status_roadmap_monitoring_influencer.id
                WHERE monitoring_influencer.id = :idMonitoring and monitoring_roadmap_influencer.status_roadmap = :status
                order by monitoring_roadmap_influencer.id DESC`, { replacements: { idMonitoring: idMonitoring, status: status }, type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties;
                });
            }

            return roadMap;
            
        } catch (error) {
            throw error;
        }

    }

    async getAllRoadmapByWording(status: number) {

        try {

            if(status === 0){
                var roadMap = await sequelize.query(`SELECT monitoring_roadmap_influencer.id, monitoring_roadmap_influencer.description, monitoring_roadmap_influencer.path, 
                status_roadmap_monitoring_influencer.id AS "idStatus", status_roadmap_monitoring_influencer.description AS "statusName",
                monitoring_roadmap_influencer.id AS "idMonitoring", user.id AS "idUser", user.name AS "userName"
                from monitoring_roadmap_influencer
                inner join monitoring_influencer on monitoring_roadmap_influencer.id_monitoring = monitoring_influencer.id
                inner join monitoring_user_actual_influencer on monitoring_user_actual_influencer.id_monitoring = monitoring_influencer.id
                inner join user on user.id = monitoring_user_actual_influencer.id_user
                inner join status_roadmap_monitoring_influencer on monitoring_roadmap_influencer.status_roadmap = status_roadmap_monitoring_influencer.id
                WHERE monitoring_roadmap_influencer.is_roadmap = true
                order by monitoring_roadmap_influencer.id DESC`, { type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties;
                });
            }else{
                var roadMap = await sequelize.query(`SELECT monitoring_roadmap_influencer.id, monitoring_roadmap_influencer.description, monitoring_roadmap_influencer.path, 
                status_roadmap_monitoring_influencer.id AS "idStatus", status_roadmap_monitoring_influencer.description AS "statusName",
                monitoring_roadmap_influencer.id AS "idMonitoring", user.id AS "idUser", user.name AS "userName"
                from monitoring_roadmap_influencer
                inner join monitoring_influencer on monitoring_roadmap_influencer.id_monitoring = monitoring_influencer.id
                inner join monitoring_user_actual_influencer on monitoring_user_actual_influencer.id_monitoring = monitoring_influencer.id
                inner join user on user.id = monitoring_user_actual_influencer.id_user
                inner join status_roadmap_monitoring_influencer on monitoring_roadmap_influencer.status_roadmap = status_roadmap_monitoring_influencer.id
                WHERE monitoring_roadmap_influencer.status_roadmap = :status and monitoring_roadmap_influencer.is_roadmap = true
                order by monitoring_roadmap_influencer.id DESC`, { replacements: { status: status }, type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties;
                });
            }

            return roadMap;
            
        } catch (error) {
            throw error;
        }

    }

}

export default new MonitoringRepository();