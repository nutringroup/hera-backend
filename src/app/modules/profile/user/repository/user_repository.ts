import { QueryTypes } from 'sequelize';
import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class UserRepository {

    async getAll(){

        try{
            const users = await sequelize.query(`SELECT user.id, user.name, user.email, user.status, office_sector.id AS "idOfficeSector", office.id AS "idOffice", office.name AS "officeName", sector.id AS "idSector", sector.name AS "sectorName" 
            from user
            inner join user_office on user.id = user_office.id_user
            inner join office_sector on user_office.id_office_sector = office_sector.id
            inner join office on office_sector.id_office = office.id
            inner join sector on office_sector.id_sector = sector.id
            order by user.name`, { type: QueryTypes.SELECT })
            .then(function(properties) {
                return properties;
            });
            return users;
        }catch(error){
            throw error;
        }
    }

}

export default new UserRepository();