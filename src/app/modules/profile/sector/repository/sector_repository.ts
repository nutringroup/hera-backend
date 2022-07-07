import { QueryTypes } from 'sequelize';
import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class SectorRepository {

    async getByIdSector(idSector: number){

        try{
            const sector = await sequelize.query(`SELECT sector.name from user_office
            inner join office_sector on user_office.id_office_sector = office_sector.id
            inner join sector on office_sector.id_sector = sector.id
            WHERE sector.id = :idSector`, { replacements: { idSector: idSector }, type: QueryTypes.SELECT})
            .then(function(properties) {
                return properties;
            });
            return sector;
        }catch(error){
            throw error;
        }
    }

}

export default new SectorRepository();