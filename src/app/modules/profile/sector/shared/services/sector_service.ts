import { Transaction } from "sequelize/types";
import AuthError from "../../../../../shared/exceptions/auth/auth_exception";
import OfficeSector from "../../../office/shared/models/office_sector";
import sectorRepository from "../../repository/sector_repository";
import Sector from "../models/sector";

class SectorService {

    async createNewSector(sector: Sector) {

        const newSector = await Sector.findOne({ where: { name: sector.name.toLowerCase() } });
        if(newSector){
            throw new AuthError('Nome do setor já existente');
        }

        await Sector.create({ name: sector.name.toLowerCase() });

        return;

    }

    async updateSector(sector: Sector){

        try {
            
            const getSector = await Sector.findOne({ where: { id: sector.id} });

            const updateSector= await Sector.findOne({ where: { name: sector.name.toLowerCase() } });
            if(updateSector){
                throw new AuthError('Nome do setor já existente');
            }

            await getSector!.update({ name: sector.name.toLowerCase() }, { where: { id: sector.id } });

        } catch (error) {
            throw error;
        }   
    }

    async deleteSector(idSector: number, transactionSector: Transaction){

        try {
            
            const sector = await sectorRepository.getByIdSector(idSector);

            if(sector.length > 0){
                throw new AuthError('Ao menos um usuário já possui cadastro com esse setor. Não é possível realizar a exclusão.');
            }

            const getSector = await Sector.findOne({ where: { id: idSector}});
            const getOfficeSector = await OfficeSector.findAll({ where: { idSector: idSector}});

            getOfficeSector.forEach( async (element) => {
                await element!.destroy({ transaction: transactionSector });
            });
            await getSector!.destroy({ transaction: transactionSector });

        } catch (error) {
            throw error;
        }

    }

}

export default new SectorService();