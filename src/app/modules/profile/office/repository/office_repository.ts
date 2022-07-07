import { QueryTypes } from 'sequelize';
import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class OfficeRepository {

    async getByIdOffice(idOffice: number){
        try{
            const sector = await sequelize.query(`SELECT office.name from user_office
            inner join office_sector on user_office.id_office_sector = office_sector.id
            inner join office on office_sector.id_office = office.id
            WHERE office.id = :idOffice`, { replacements: { idOffice: idOffice }, type: QueryTypes.SELECT})
            .then(function(properties) {
                return properties;
            });
            return sector;
        }catch(error){
            throw error;
        }
    }

    async getAllOfficeSector(){
        try{
            const sector = await sequelize.query(`SELECT office_sector.id, office.id AS "officeId", office.name AS "officeName", sector.id AS "sectorId", sector.name AS "sectorName" from office_sector
            inner join office on office_sector.id_office = office.id
            inner join sector on office_sector.id_sector = sector.id
            order by office.name`, { type: QueryTypes.SELECT})
            .then(function(properties) {
                return properties;
            });
            return sector;
        }catch(error){
            throw error;
        }
    }

}

export default new OfficeRepository();