//'use strict'
//import EmailError from '../exceptions/exceptions';
import { QueryTypes } from "sequelize";
import SequelizeConnect  from '../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class AuthRepository {

    async accessValidateRoute(routeAccess: string, idUser: number) {
        try{
            const access = await sequelize.query(`SELECT * from user
            inner join user_office on user.id = user_office.id_user
            inner join office_sector on user_office.id_office_sector = office_sector.id
            inner join module_office_sector on office_sector.id = module_office_sector.id_office_sector
            inner join module on module_office_sector.id_module = module.id
            inner join module_pages on module.id = module_pages.id_module
            inner join pages on module_pages.id_pages = pages.id
            WHERE pages.url = :route and user.id = :idUser and user.status = 1`, { replacements: { route: routeAccess, idUser: idUser }, type: QueryTypes.SELECT})
            .then(function(properties) {
                if(properties.length > 0){
                    return true;
                }else{
                    return false;
                }
            });
            return access;
        }catch(error){
            throw error;
        }
    }

    async getUserProfile(email: string) {
        try{
            const access = await sequelize.query(`SELECT office_sector.id, office.id AS "idOffice", office.name AS "office", sector.name AS "sector" 
            from user
            inner join user_office on user.id = user_office.id_user
            inner join office_sector on user_office.id_office_sector = office_sector.id
            inner join office on office_sector.id_office = office.id
            inner join sector on office_sector.id_sector = sector.id
            WHERE user.email = :email`, { replacements: { email: email }, type: QueryTypes.SELECT})
            .then(function(properties) {
                return properties[0];
            });
            return access;
        }catch(error){
            throw error;
        }
    }

    async getUserMenu(idOfficeSector: number) {
        try{
            const access = await sequelize.query(`SELECT pages.id, pages.name, pages.url, pages.icon, pages.menu, pages.id_pai AS "idPai", pages.order,
            pages.access_director AS "accessDirector", pages.access_teamleader AS "accessTeamLeader", pages.access_analyst AS "accessAnalyst"
            from pages
            inner join module_pages on pages.id = module_pages.id_pages
            inner join module on module_pages.id_module = module.id
            inner join module_office_sector on module.id = module_office_sector.id_module
            inner join office_sector on module_office_sector.id_office_sector = office_sector.id
            WHERE office_sector.id = :id 
            order by pages.order`, { replacements: { id: idOfficeSector }, type: QueryTypes.SELECT})
            .then(function(properties) {
                return properties;
            });
            return access;
        }catch(error){
            throw error;
        }
    }

    async userTypeDirector(idUser: number){

        try{
            const idOffice = await sequelize.query(`SELECT office.id from user
            inner join user_office on user.id = user_office.id_user
            inner join office_sector on user_office.id_office_sector = office_sector.id
            inner join office on office_sector.id_office = office.id
            WHERE user.id = :idUser and office.id = 1`, { replacements: { idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            if(idOffice.length > 0)
                return true;
            else
                return false;
        }catch(error){
            throw error;
        }
    }

    async userTypeTeamLeader(idUser: number){

        try{
            const idOffice = await sequelize.query(`SELECT office.id from user
            inner join user_office on user.id = user_office.id_user
            inner join office_sector on user_office.id_office_sector = office_sector.id
            inner join office on office_sector.id_office = office.id
            WHERE user.id = :idUser and office.id = 14`, { replacements: { idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            if(idOffice.length > 0)
                return true;
            else
                return false;
        }catch(error){
            throw error;
        }
    }

    async userTypeDirectorOrTeamLeader(idUser: number){

        try{
            const idOffice = await sequelize.query(`SELECT office.id from user
            inner join user_office on user.id = user_office.id_user
            inner join office_sector on user_office.id_office_sector = office_sector.id
            inner join office on office_sector.id_office = office.id
            WHERE user.id = :idUser and office.id in (1, 14)`, { replacements: { idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            if(idOffice.length > 0)
                return true;
            else
                return false;
        }catch(error){
            throw error;
        }
    }

    async userTypeLegal(idUser: number){

        try{
            const idOffice = await sequelize.query(`SELECT office.id from user
            inner join user_office on user.id = user_office.id_user
            inner join office_sector on user_office.id_office_sector = office_sector.id
            inner join office on office_sector.id_office = office.id
            inner join sector on office_sector.id_sector = sector.id
            WHERE user.id = :idUser and sector.id = 45`, { replacements: { idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            if(idOffice.length > 0)
                return true;
            else
                return false;
        }catch(error){
            throw error;
        }
    }

    async userTypeDirectorLegal(idUser: number){

        try{
            const idOffice = await sequelize.query(`SELECT office.id from user
            inner join user_office on user.id = user_office.id_user
            inner join office_sector on user_office.id_office_sector = office_sector.id
            inner join office on office_sector.id_office = office.id
            inner join sector on office_sector.id_sector = sector.id
            WHERE user.id = :idUser and office.id = 1 and sector.id = 45`, { replacements: { idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            if(idOffice.length > 0)
                return true;
            else
                return false;
        }catch(error){
            throw error;
        }
    }

    async userPolicyComplete(idUser: number, office: number, sector: number, bothType?: boolean){

        try{
            
            if(!bothType) {
                var idOffice = await sequelize.query(`SELECT office.id from user
                inner join user_office on user.id = user_office.id_user
                inner join office_sector on user_office.id_office_sector = office_sector.id
                inner join office on office_sector.id_office = office.id
                inner join sector on office_sector.id_sector = sector.id
                WHERE user.id = :idUser and office.id = :office and sector.id = :sector`, { replacements: { idUser: idUser, office: office, sector: sector }, type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties;
                });
            }else{
                var idOffice = await sequelize.query(`SELECT office.id from user
                inner join user_office on user.id = user_office.id_user
                inner join office_sector on user_office.id_office_sector = office_sector.id
                inner join office on office_sector.id_office = office.id
                inner join sector on office_sector.id_sector = sector.id
                WHERE user.id = :idUser and office.id in (1,14) and sector.id = :sector`, { replacements: { idUser: idUser, sector: sector }, type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties;
                }); 
            }

            if(idOffice.length > 0)
                return true;
            else
                return false;
        }catch(error){
            throw error;
        }
    }

    async userTypeSector(idUser: number, sector: number){

        try{
            const idOffice = await sequelize.query(`SELECT office.id from user
            inner join user_office on user.id = user_office.id_user
            inner join office_sector on user_office.id_office_sector = office_sector.id
            inner join office on office_sector.id_office = office.id
            inner join sector on office_sector.id_sector = sector.id
            WHERE user.id = :idUser and sector.id = :sector`, { replacements: { idUser: idUser, sector: sector}, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            if(idOffice.length > 0)
                return true;
            else
                return false;
        }catch(error){
            throw error;
        }
    }

    async teamLeaderTypeInfluencer(idUser: number, idSquad: number, type: number){

        try{
            
            if(type === 1) {
                var userSquad = await sequelize.query(`SELECT id from squad_influencer WHERE id = :idSquad and id_team_leader = :idUser`, { replacements: { idUser: idUser, idSquad: idSquad }, type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties;
                });
            }else{
                var userSquad = await sequelize.query(`SELECT id from squad_influencer WHERE id = :idSquad and id_team_leader_monitoring = :idUser`, { replacements: { idUser: idUser, idSquad: idSquad }, type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties;
                });
            }

            if(userSquad.length > 0)
                return true;
            else
                return false;
        }catch(error){
            throw error;
        }
    }

    async teamLeaderProspectionWithoutSquadInfluencer(idUser: number){

        try{
            
            
            var user = await sequelize.query(`SELECT id from squad_influencer WHERE id_team_leader = :idUser`, { replacements: { idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
            

            if(user.length > 0)
                return true;
            else
                return false;
        }catch(error){
            throw error;
        }
    }

    async userTypeInfluencer(idUser: number, idSquad: number, type: number){

        try{
            
            if(type === 1) {
                var userSquad = await sequelize.query(`SELECT id from squad_user_prospection WHERE id_squad = :idSquad and id_user_prospection = :idUser`, { replacements: { idUser: idUser, idSquad: idSquad }, type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties;
                });
            }else{
                var userSquad = await sequelize.query(`SELECT id from squad_user_monitoring WHERE id_squad = :idSquad and id_user_monitoring = :idUser`, { replacements: { idUser: idUser, idSquad: idSquad }, type: QueryTypes.SELECT })
                .then(function(properties) {
                    return properties;
                });
            }

            if(userSquad.length > 0)
                return true;
            else
                return false;
        }catch(error){
            throw error;
        }
    }

    async userProspectionWithoutSquadfluencer(idUser: number){

        try{
            
            var userSquad = await sequelize.query(`SELECT id from squad_user_prospection WHERE id_user_prospection = :idUser`, { replacements: { idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });

            if(userSquad.length > 0)
                return true;
            else
                return false;
        }catch(error){
            throw error;
        }
    }

    async userSector (idUser: number) {
        try{
            const userSector = await sequelize.query(`select sector.id, sector.name from user_office inner join office_sector on user_office.id_office_sector = office_sector.id inner join user on user_office.id_user = user.id
            inner join sector on sector.id = office_sector.id_sector and user.id = :idUser;`,
              { replacements: { idUser: idUser }, type: QueryTypes.SELECT })
            .then(function(properties: any) {
                if(properties.length > 0)
                    return properties[0];
                else
                    return '';
            });
            return userSector;

        }catch(error){
            throw error;
        }
    }

}

export default new AuthRepository();