import { Request, Response } from "express";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";
import prospectionService from "../shared/services/prospection_service";
import prospectionValidation from "../shared/validations/prospection_validation";
import ProspectionError from "../../../../shared/exceptions/prospection/prospection_exception";

import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class ProspectionChecklistController {

    // ******** POST ********

    async create(req: Request, res: Response): Promise<Response> {

        const prospection = req.body;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.checklistValidation(prospection.checklist);
            await prospectionValidation.checklistSocialValidation(prospection.checklistSocial);

            await prospectionService.createChecklist(prospection.checklist, transaction);
            await prospectionService.createChecklistSocial(prospection.checklistSocial, prospection?.checklist?.commentChecklist, transaction);

            await transaction.commit();
            return res.json(true);
            
        } catch (error) {
            await transaction.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async createContract(req: Request, res: Response): Promise<Response> {

        const contract = req.body;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.validateContract(contract);

            await prospectionService.createNewContract(contract, req.file, transaction);

            await transaction.commit();
            return res.json(true);
            
        } catch (error) {
            
            await transaction.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async createChecklistFile(req: Request, res: Response): Promise<Response> {

        const checklist = req.body;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.requestApprovalValidation(checklist);

            await prospectionService.createNewChecklistFile(checklist, req.file, transaction);

            await transaction.commit();
            return res.json(true);
            
        } catch (error) {
            await transaction.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async createProspectionFinancial(req: Request, res: Response): Promise<Response> {

        const payment = req.body;
        const transaction = await sequelize.transaction();
        const idUser = req.idUser

        try {

            await prospectionValidation.financialValidation(payment);

            await prospectionService.createProspectionFinancial(payment, idUser, transaction);

            await transaction.commit();
            return res.json(true);
            
        } catch (error) {
            await transaction.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    // ******** PUT ********

    async updateContract(req: Request, res: Response): Promise<Response> {

        const contract = req.body;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.validateContract(contract);

            await prospectionService.updateContract(contract, req.file, transaction);

            await transaction.commit();
            return res.json(true);
            
        } catch (error) {
            
            await transaction.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async influencerApprovalContract(req: Request, res: Response): Promise<Response> {

        const contract = req.body;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.validateApprovalContractValidation(contract);

            await prospectionService.influencerApprovalContract(contract, transaction);

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

    async sendInfluencerContract(req: Request, res: Response): Promise<Response> {

        const contract = req.body;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.requestApprovalValidation(contract);

            await prospectionService.sendInfluencerContract(contract.idProspection, transaction);
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

    async updateChecklist(req: Request, res: Response): Promise<Response> { 

        const prospection = req.body;
        const transaction = await sequelize.transaction()

        try {
            await prospectionValidation.checklistValidation(prospection.checklist) 
            await prospectionValidation.checklistSocialValidation(prospection.checklistSocial)

            await prospectionService.updateChecklist(prospection.checklist, transaction)
            await prospectionService.updateChecklistSocial(prospection.checklistSocial, prospection?.checklist?.commentChecklist, transaction) 
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
            await prospectionService.updateProspectionFinancial(payment, transaction) 
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

    // ******** GET ********

    async getContract(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;

        try {

            const prospectionContract = await prospectionService.getContract(Number(idProspection));

            return res.json(prospectionContract);
            
        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getChecklist(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;

        try {

            const url = await prospectionService.getChecklist(Number(idProspection));

            return res.json(url);
            
        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getContractOrChecklist(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;

        try {

            const url = await prospectionService.getContractOrChecklist(Number(idProspection));

            return res.json(url);
            
        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getFormChecklist(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;

        try {

            const checklist = await prospectionService.getFormChecklist(Number(idProspection));
            const checklistSocial = await prospectionService.getChecklistValuesSocial(Number(idProspection));

            return res.json({ info: checklist, social: checklistSocial });
            
        } catch (error) {
            
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getPayment(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;

        try {

            const payments = await prospectionService.getPayment(Number(idProspection));

            return res.json(payments);
            
        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getCommentsEmailsContract(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;

        try {

            const commentsEmails = await prospectionService.getCommentsEmailsContract(Number(idProspection));

            return res.json(commentsEmails);
            
        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

}

export default ProspectionChecklistController;