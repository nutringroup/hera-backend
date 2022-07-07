import { Transaction } from "sequelize/types";
import AuthError from "../../../../../shared/exceptions/auth/auth_exception";
import UserOffice from "../../../user/shared/models/user_office";
import officeRepository from "../../repository/office_repository";
import Office from "../models/office";
import OfficeSector from "../models/office_sector";

class OfficeService {

    async createNewOffice(office: Office){

        try {
            
            const newOffice = await Office.findOne({ where: { name: office.name.toLowerCase() }});
            if(newOffice){
                throw new AuthError('Nome do cargo já existente');
            }

            await Office.create({ name: office.name.toLowerCase() });

            return;

        } catch (error) {
            throw error;
        }

    }

    async createNewOfficeSector(officeSector: OfficeSector){

        try {
            
            const newOfficeSector = await OfficeSector.findOne({ where: { idOffice: officeSector.idOffice, idSector: officeSector.idSector } });
            if(newOfficeSector){
                throw new AuthError('Essa relação de cargo e setor já foi cadastrada');
            }

            await OfficeSector.create({ idOffice: officeSector.idOffice, idSector: officeSector.idSector });

            return;

        } catch (error) {
            throw error;
        }

    }

    async getAllOfficeSector(){

        try {
            
            const officeList = await officeRepository.getAllOfficeSector();

            let officeListFormated: any[] = [];

            if(officeList.length > 0)
                officeList.forEach( (element: any) => {
                    officeListFormated.push({
                        id: element.id,
                        office: {
                            id: element.officeId,
                            name: element.officeName
                        },
                        sector: {
                            id: element.sectorId,
                            name: element.sectorName
                        }
                    });
                });

            return officeListFormated;

        } catch (error) {
            throw error;
        }

    }

    async updateOffice(office: Office){

        try {
            
            const getOffice = await Office.findOne({ where: { id: office.id} });

            const updateOffice = await Office.findOne({ where: { name: office.name.toLowerCase() } });
            if(updateOffice){
                throw new AuthError('Nome do cargo já existente');
            }

            await getOffice!.update({ name: office.name.toLowerCase() }, { where: { id: office.id } });

        } catch (error) {
            throw error;
        }

    }

    async deleteOffice(idOffice: number, transactionOffice: Transaction){

        try {
            
            const office = await officeRepository.getByIdOffice(idOffice);

            if(office.length > 0){
                throw new AuthError('Ao menos um usuário já possui cadastro com esse cargo. Não é possível realizar a exclusão.');
            }

            const getOffice = await Office.findOne({ where: { id: idOffice}});
            const getOfficeSector = await OfficeSector.findAll({ where: { idOffice: idOffice}});

            getOfficeSector.forEach( async (element) => {
                await element!.destroy({ transaction: transactionOffice });
            });
            await getOffice!.destroy({ transaction: transactionOffice });

            return;

        } catch (error) {
            throw error;
        }

    }

    async deleteOfficeSector(idOfficeSector: number){

        try {
            
            const office = await UserOffice.findAll({ where: { idOfficeSector: idOfficeSector}}); //OfficeRepository.getByIdOffice(idOffice);
            if(office.length > 0){
                throw new AuthError('Ao menos um usuário já possui cadastro com esse cargo. Não é possível realizar a exclusão.');
            }

            const getOfficeSector = await OfficeSector.findOne({ where: { id: idOfficeSector }});
            await getOfficeSector!.destroy();

            return;

        } catch (error) {
            throw error;
        }

    }

}

export default new OfficeService();