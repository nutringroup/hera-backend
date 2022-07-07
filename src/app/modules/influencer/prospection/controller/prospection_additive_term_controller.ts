import { Request, Response } from "express";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";
import MonitoringError from "../../../../shared/exceptions/monitoring/monitoring_exception";
import prospectionAdditiveTermService from "../shared/services/prospection_additive_term_service";
import SequelizeConnect  from '../../../../../config/sequelize_request';
import prospectionAdditiveTermValidation from "../shared/validations/prospection_additive_term_validation";
import prospectionValidation from "../shared/validations/prospection_validation"
import ProspectionError from "../../../../shared/exceptions/prospection/prospection_exception";
const sequelize = SequelizeConnect.sequelizeConnect;  

class ProspectionAdditiveTermController {

    // ==== GET ====

    async getReasonAdditiveTerm(req: Request, res: Response): Promise<Response> {

        try {
            const reasonAdditiveTerm = await prospectionAdditiveTermService.getReasonAdditiveTerm()
            return res.json(reasonAdditiveTerm)
        }
        catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async getAdditiveTerm(req: Request, res: Response): Promise<Response> {

        const idUser = req.idUser;

        try {

            const addiviteTerm = await prospectionAdditiveTermService.getAdditiveTerm(idUser)
            return res.json(addiviteTerm);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getAllAdditiveTermByLegal(req: Request, res: Response): Promise<Response> {

        try {
            const additiveTerm = await prospectionAdditiveTermService.getAllAdditiveTermByLegal();
            return res.json(additiveTerm);
            
        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }


    // ==== POST ====

    async createAdditiveTerm(req: Request, res: Response): Promise<Response> {

        const additiveTerm = req.body
        const file = req.file
        const transactionAdditiveTerm = await sequelize.transaction()

        try {
            await prospectionAdditiveTermValidation.createAdditiveTermValidation(additiveTerm)
            await prospectionAdditiveTermService.createAdditiveTerm(additiveTerm, file, transactionAdditiveTerm)
            await transactionAdditiveTerm.commit()
            return res.json(true)
        }
        catch (error) {
            await transactionAdditiveTerm.rollback()
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async uploadAdditiveTerm(req: Request, res: Response): Promise<Response> {

        const additiveTerm = req.body
        const file = req.file
        const transactionAdditiveTerm = await sequelize.transaction()

        try {
            await prospectionAdditiveTermValidation.uploadAdditiveTermValidation(additiveTerm)
            await prospectionAdditiveTermService.uploadAdditiveTerm(additiveTerm, file, transactionAdditiveTerm)
            await transactionAdditiveTerm.commit()
            return res.json(true)
        }
        catch (error) {
            await transactionAdditiveTerm.rollback()
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    // ==== PUT ====

    async validateLegalAdditiveTerm(req: Request, res: Response): Promise<Response> {

        const additiveTerm = req.body
        const transactionAdditiveTerm = await sequelize.transaction()

        try {

            await prospectionAdditiveTermValidation.validateLegalAdditiveTermValidation(additiveTerm)
            await prospectionAdditiveTermService.validateLegalAdditiveTerm(additiveTerm, transactionAdditiveTerm)
            await transactionAdditiveTerm.commit()

            return res.json(true)
        }
        catch (error) {
            await transactionAdditiveTerm.rollback()
            if(error instanceof AuthError)
            return res.status(400).json({error: error.message});
        else if(error instanceof MonitoringError)
            return res.status(400).json({error: error.message});
        else
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async validateMonitoringAdditiveTerm(req: Request, res: Response): Promise<Response> {

        const additiveTerm = req.body
        const transactionAdditiveTerm = await sequelize.transaction()

        try {
            await prospectionAdditiveTermValidation.validateAdditiveTermValidation(additiveTerm)
            await prospectionAdditiveTermService.validateMonitoringAdditiveTerm(additiveTerm, transactionAdditiveTerm)
            await transactionAdditiveTerm.commit()
            return res.json(true)
        }
        catch (error) {
            await transactionAdditiveTerm.rollback()
            if(error instanceof AuthError)
            return res.status(400).json({error: error.message});
        else if(error instanceof MonitoringError)
            return res.status(400).json({error: error.message});
        else
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async updateInstagramNameInfluencer(req: Request, res: Response): Promise<Response> {

        const influencer = req.body
        const transactionAdditiveTerm = await sequelize.transaction()

        try {
            await prospectionAdditiveTermValidation.updateInstagramNameInfluencer(influencer)
            await prospectionAdditiveTermService.updateInstagramNameInfluencer(influencer, transactionAdditiveTerm)
            await transactionAdditiveTerm.commit()
            return res.json(true)
        }
        catch (error) {
            await transactionAdditiveTerm.rollback()
        if(error instanceof AuthError)
            return res.status(400).json({error: error.message});
        else
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async updateChecklist(req: Request, res: Response): Promise<Response> { 

        const prospection = req.body;
        const transaction = await sequelize.transaction()

        try {
            await prospectionValidation.checklistValidation(prospection.checklist) 
            await prospectionValidation.checklistSocialValidation(prospection.checklistSocial)

            await prospectionAdditiveTermService.updateChecklist(prospection.checklist, transaction)
            await prospectionAdditiveTermService.updateChecklistSocial(prospection.checklistSocial, transaction) 
            await transaction.commit()
            return res.json(true)
        }
        catch(error) {
            await transaction.rollback()
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async updateProspectionFinancial(req: Request, res: Response): Promise<Response> {

        const payment = req.body
        const transaction = await sequelize.transaction()
        try {
            await prospectionValidation.updateFinancialValidation(payment)
            await prospectionAdditiveTermService.updateProspectionFinancial(payment, transaction) 
            await transaction.commit()
            return res.json(true)
        }
        catch (error) {
            await transaction.rollback()
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

}

export default ProspectionAdditiveTermController