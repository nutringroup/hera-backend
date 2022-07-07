import { QueryTypes } from 'sequelize';

import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ModuleRepository {
    
    async pagesByIdModule(idModule: number){

        try{
            const sector = await sequelize.query(`SELECT pages.name, pages.url from module
            inner join module_pages on module.id = module_pages.id_module
            inner join pages on module_pages.id_pages = pages.id
            WHERE  module.id = :idModule`, { replacements: { idModule: idModule }, type: QueryTypes.SELECT})
            .then(function(properties) {
                return properties;
            });
            return sector;
        }catch(error){
            throw error;
        }
    }

}

export default new ModuleRepository();