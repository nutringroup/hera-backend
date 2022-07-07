import { Request, Response } from "express";
import Sector from "../shared/models/sector";
import sectorValidation from "../shared/validations/sector_validation";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";
import sectorService from "../shared/services/sector_service";

import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class SectorController {

    // ******** POST ********

    async create(req: Request, res: Response): Promise<Response> {

        const sector: Sector = req.body;

        try {

            await sectorValidation.createValidation(req.body);
            await sectorService.createNewSector(sector);

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
            const sectors = await Sector.findAll();
            return res.json(sectors);

        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação.'});
        }

    }

    // ******** PUT ********

    async update(req: Request, res: Response): Promise<any> {

        const sector: Sector = req.body;

        try {
            
            await sectorValidation.updateValidation(req.body);
            await sectorService.updateSector(sector);

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

        const transactionSector = await sequelize.transaction();
        const idSector: number = Number(req.params.id);

        try {

            await sectorService.deleteSector(idSector, transactionSector);
            await transactionSector.commit();

            return res.json(true);

        } catch (error) {
            
            await transactionSector.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

}

export default SectorController;