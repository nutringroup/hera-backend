import { Request, Response } from "express";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";
import prospectionService from "../shared/services/prospection_service";
import prospectionValidation from "../shared/validations/prospection_validation";

import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionLegalController {

    // ******** PUT ********

    async approvalContract(req: Request, res: Response): Promise<Response> {

        const contract = req.body;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.validateApprovalContractValidation(contract);

            await prospectionService.validationApprovalContract(contract, transaction);
            
            await transaction.commit();
            return res.json(true);
            
        } catch (error) {
            await transaction.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async sendSignEmailContract(req: Request, res: Response): Promise<Response> {

        const contract = req.body;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.requestApprovalValidation(contract);

            await prospectionService.sendSignEmailContract(contract.idProspection, transaction);
            await transaction.commit();
            return res.json(true);
            
        } catch (error) {
            
            await transaction.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async signatureApprovalContract(req: Request, res: Response): Promise<Response> {

        const contract = req.body;
        const transaction = await sequelize.transaction();
        const idUser = req.idUser

        try {

            await prospectionValidation.validateApprovalContractValidation(contract);

            await prospectionService.signatureApprovalContract(contract, idUser, req.file, transaction);
            await transaction.commit();
            return res.json(true);
            
        } catch (error) {
            await transaction.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }
    
    // ******** GET ********

    async getAll(req: Request, res: Response): Promise<Response> {

        const status = req.params.status;

        try {

            const prospections = await prospectionService.getAllLegal(Number(status));
            return res.json(prospections);
            
        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getErrorContract(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;

        try {

            const errorContract = await prospectionService.getErrorContract(Number(idProspection));
            return res.json(errorContract);
            
        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

}

export default ProspectionLegalController;