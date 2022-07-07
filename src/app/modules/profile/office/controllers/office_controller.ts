import { Request, Response } from "express";
import OfficeSector from "../shared/models/office_sector";
import Office from "../shared/models/office";
import officeValidation from "../shared/validations/office_validation";
import officeService from "../shared/services/office_service";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";

import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class OfficeController {

    // ******** POST ********

    async create(req: Request, res: Response): Promise<Response> {

        const office: Office = req.body;

        try {

            await officeValidation.createValidation(req.body);
            await officeService.createNewOffice(office);

            return res.json(true);
            
        } catch (error) {
            
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async createOfficeSector(req: Request, res: Response): Promise<Response> {

        const officeSector: OfficeSector = req.body;

        try {

            await officeValidation.createOfficeSectorValidation(req.body);
            await officeService.createNewOfficeSector(officeSector);

            return res.json(true);
            
        } catch (error) {
            
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    // ******** GET ********
    
    async getAll(req: Request, res: Response): Promise<Response> {

        try {
            
            const officeList = await Office.findAll({
                attributes: ['id', 'name']
            });

            return res.json(officeList);

        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação.'});
        }

    }

    async getAllOfficeSector(req: Request, res: Response): Promise<Response> {

        try {
            
            const officeSectorList = await officeService.getAllOfficeSector();

            return res.json(officeSectorList);

        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação.'});
        }

    }

    // ******** PUT ********

    async update(req: Request, res: Response): Promise<any> {

        const office: Office = req.body;

        try {
            
            await officeValidation.updateValidation(req.body);
            await officeService.updateOffice(office);

            return res.json(true);

        } catch (error) {
            
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    // ******** DELETE ********

    async delete(req: Request, res: Response): Promise<any> {

        const transactionOffice = await sequelize.transaction();
        const idOffice: number = Number(req.params.id);

        try {

            await officeService.deleteOffice(idOffice, transactionOffice);
            await transactionOffice.commit();

            return res.json(true);

        } catch (error) {
            
            await transactionOffice.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async deleteOfficeSector(req: Request, res: Response): Promise<any> {

        const idOfficeSector: number = Number(req.params.id);

        try {

            await officeService.deleteOfficeSector(idOfficeSector);

            return res.json(true);

        } catch (error) {
            
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

}

export default OfficeController;