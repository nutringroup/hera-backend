import { QueryTypes } from 'sequelize';
import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class SquadRepository {

    async squadsByUser(idUser: number){

        try{
            const squads = await sequelize.query(`SELECT squad_influencer.id, squad_influencer.name from squad_influencer
            left join squad_user_prospection on squad_influencer.id = squad_user_prospection.id_squad
            left join user userProspection on squad_user_prospection.id_user_prospection = userProspection.id
            left join squad_user_monitoring on squad_influencer.id = squad_user_monitoring.id_squad
            left join user userMonitoring on squad_user_monitoring.id_user_monitoring = userMonitoring.id
            WHERE squad_influencer.id_team_leader = :idUser or squad_influencer.id_team_leader_monitoring = :idUser or userMonitoring.id = :idUser or userProspection.id = :idUser
            GROUP BY squad_influencer.name`, { replacements: { idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
            return squads;

        }catch(error){
            throw error;
        }
    }

    async squadsByUserTeam(idUser: number){

        try{
            const squads = await sequelize.query(`SELECT squad_influencer.id, squad_influencer.name from squad_influencer
            left join squad_user_prospection on squad_influencer.id = squad_user_prospection.id_squad
            left join user userProspection on squad_user_prospection.id_user_prospection = userProspection.id
            left join squad_user_monitoring on squad_influencer.id = squad_user_monitoring.id_squad
            left join user userMonitoring on squad_user_monitoring.id_user_monitoring = userMonitoring.id
            WHERE userMonitoring.id = :idUser or userProspection.id = :idUser
            GROUP BY squad_influencer.name`, { replacements: { idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
            return squads;

        }catch(error){
            throw error;
        }
    }

    async usersAvailable(){

        try{
            const users = await sequelize.query(`SELECT user.id, user.name from user
            inner join user_office on user.id = user_office.id_user
            inner join office_sector on user_office.id_office_sector = office_sector.id
            inner join office on office_sector.id_office = office.id
            inner join module_office_sector on office_sector.id = module_office_sector.id_office_sector
            inner join module on module_office_sector.id_module = module.id
            WHERE module.id = 3 and office.id not in (1,14) and user.status = 1`, { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
            return users;

        }catch(error){
            throw error;
        }
    }

    async usersMonitoringSquad(idSquad: number){

        try{
            const users = await sequelize.query(`SELECT user.id, user.name from squad_influencer
            inner join squad_user_monitoring on squad_influencer.id = squad_user_monitoring.id_squad
            inner join user on squad_user_monitoring.id_user_monitoring = user.id
            WHERE squad_influencer.id = :idSquad`, { replacements: { idSquad: idSquad }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
            return users;

        }catch(error){
            throw error;
        }
    }
    
    async usersProspectionSquad(idSquad: number) {

        try{
            const users = await sequelize.query(`SELECT user.id, user.name from squad_influencer
            inner join squad_user_prospection on squad_influencer.id = squad_user_prospection.id_squad
            inner join user on squad_user_prospection.id_user_prospection = user.id
            WHERE squad_influencer.id = :idSquad`, { replacements: { idSquad: idSquad }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
            return users;

        }catch(error){
            throw error;
        }
    }

    async teamLeaderSquad(idSquad: number, type: number) {

        // type 0 - prospection / 1 - monitoring

        try{

            if(type === 0){
                var users = await sequelize.query(`SELECT user.id, user.name from squad_influencer
                inner join user user on squad_influencer.id_team_leader = user.id
                WHERE squad_influencer.id = :idSquad`, { replacements: { idSquad: idSquad }, type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties[0];
                });   
            }else{
                var users = await sequelize.query(`SELECT user.id, user.name from squad_influencer
                inner join user user on squad_influencer.id_team_leader_monitoring = user.id
                WHERE squad_influencer.id = :idSquad`, { replacements: { idSquad: idSquad }, type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties[0];
                });  
            }
            return users;

        }catch(error){
            throw error;
        }
    }

    async usersTeamLeader() {

        try{
            const users = await sequelize.query(`SELECT user.id, user.name from user
            inner join user_office on user.id = user_office.id_user
            inner join office_sector on user_office.id_office_sector = office_sector.id
            inner join office on office_sector.id_office = office.id
            inner join module_office_sector on office_sector.id = module_office_sector.id_office_sector
            inner join module on module_office_sector.id_module = module.id
            WHERE module.id = 3 and office.id = 14 and user.status = 1`, { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
            return users;

        }catch(error){
            throw error;
        }
    }

    async usersTeamLeaderByIdSquad(idSquad: number) {

        try{
            const users = await sequelize.query(`SELECT user.id, user.name from user
            inner join user_office on user.id = user_office.id_user
            inner join office_sector on user_office.id_office_sector = office_sector.id
            inner join office on office_sector.id_office = office.id
            inner join module_office_sector on office_sector.id = module_office_sector.id_office_sector
            inner join module on module_office_sector.id_module = module.id
            WHERE module.id = 3 and office.id = 14 and user.status = 1 
            and user.id <> (SELECT user.id from user inner join squad_influencer on user.id = squad_influencer.id_team_leader WHERE squad_influencer.id = :idSquad)`, { replacements: { idSquad: idSquad }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
            return users;

        }catch(error){
            throw error;
        }
    }

    async usersActualSquad(idSquad: number, idUser: number) {

        try{
            const users = await sequelize.query(`SELECT prospection_influencer.id, process_prospection_influencer.id_status
            from prospection_influencer
            inner join process_prospection_influencer on prospection_influencer.id = process_prospection_influencer.id_prospection
            inner join prospection_user_actual_influencer on prospection_influencer.id = prospection_user_actual_influencer.id_prospection
            WHERE prospection_user_actual_influencer.id_user = :idUser and prospection_influencer.id_squad = :idSquad and process_prospection_influencer.id_status not in(5,6)`, { replacements: { idSquad: idSquad, idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
            return users;

        }catch(error){
            throw error;
        }
    }

    async squadUserByProspection(idProspection: number) {

        try{
            const squad = await sequelize.query(`select id_squad from prospection_influencer where prospection_influencer.id = :idProspection;`
            , { replacements: { idProspection: idProspection,}, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
            return squad;

        }catch(error){
            throw error;
        }
    }

}

export default new SquadRepository();