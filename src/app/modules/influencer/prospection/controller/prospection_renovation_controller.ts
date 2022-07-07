import { Request, Response } from "express";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";
import prospectionRenovationService from "../shared/services/prospection_renovation_service";
import prospectionRenovationValidation from "../shared/validations/prospection_renovation_validation";
import ProspectionError from "../../../../shared/exceptions/prospection/prospection_exception";
import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;  

class ProspectionRenovationConroller {

    // ******** POST ********

    async create(req: Request, res: Response): Promise<Response> {

        const renovation = req.body;
        const file = req.file;

        try {

            await prospectionRenovationValidation.createRenovationValidation(renovation);
            await prospectionRenovationService.createRenovation(renovation, file);

            return res.json(true);
            
        } catch (error) {
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async approvalRenovation(req: Request, res: Response): Promise<Response> {

        const renovation = req.body;
        const idUser = req.idUser;
        const transactionRenovation = await sequelize.transaction();

        try {

            await prospectionRenovationValidation.approvalRenovationValidation(renovation);
            await prospectionRenovationService.approvalRenovation(renovation, idUser, transactionRenovation);

            await transactionRenovation.commit();
            return res.json(true);
            
        } catch (error) {
            await transactionRenovation.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    // ******** GET ********

    async getAll(req: Request, res: Response): Promise<Response> {

        try {   

            const renovationList =  await prospectionRenovationService.getAll(req.idUser);

            return res.json(renovationList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

}

export default ProspectionRenovationConroller;