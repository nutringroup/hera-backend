import { Request, Response } from "express";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";
import prospectionService from "../shared/services/prospection_service";
import prospectionValidation from "../shared/validations/prospection_validation";
import ProspectionError from "../../../../shared/exceptions/prospection/prospection_exception";

import SequelizeConnect  from '../../../../../config/sequelize_request';
import notificationService from "../../../notification/shared/services/notification_service";
const sequelize = SequelizeConnect.sequelizeConnect;  

class ProspectionDocumentationController {

    // ******** POST ********

    async createTokenDocumentation(req: Request, res: Response): Promise<Response>{

        const prospection = req.body;

        try {

            await prospectionValidation.requestApprovalValidation(prospection);
            const returnToken: any = await prospectionService.createTokenDocument(prospection);
            return res.json({ token: returnToken });
            
        } catch (error) {
            
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async create(req: Request, res: Response): Promise<Response> {

        const doc = req.body;
        const files = req.files;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.documentationCreateValidation(doc);

            const idDocumetation = await prospectionService.validateDocumentation(doc);
            if(idDocumetation > 0){
                await prospectionService.updateDocumentation(doc, idDocumetation, transaction);
                const newDocContractorId = await prospectionService.insertContractorDocumentation(doc, idDocumetation, transaction);
                await prospectionService.insertContractorDocumentationFiles(doc, files, newDocContractorId, transaction);
            }else{
                await prospectionService.clearDocumentation(doc, transaction);
                const newDocId = await prospectionService.createDocumentation(doc, transaction);
                const newDocContractorId = await prospectionService.insertContractorDocumentation(doc, newDocId, transaction);
                await prospectionService.insertContractorDocumentationFiles(doc, files, newDocContractorId, transaction);
            }

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

    async createIntervening(req: Request, res: Response): Promise<Response> {

        const doc = req.body;
        const files = req.files;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.documentationCreateInterveningValidation(doc);

            const idDocumetation = await prospectionService.validateDocumentation(doc);
            if(idDocumetation > 0){
                const newDocInterveningId = await prospectionService.insertInterveningDocumentation(doc, idDocumetation, transaction);
                await prospectionService.insertInterveningDocumentationFiles(doc, files, newDocInterveningId, transaction);
            }else{
                throw new ProspectionError('Não foi possível continuar com a documentação. Token inválido!!');
            }

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

    async createBankDocument(req: Request, res: Response): Promise<Response> {

        const bankDocument = req.body;
        const file = req.file;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.checklistBankValidation(bankDocument);

            await prospectionService.createChecklistBank(bankDocument, file, transaction);

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

    async createAddressDocument(req: Request, res: Response): Promise<Response> {

        const addressDocument = req.body;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.checklistAddressValidation(addressDocument);

            await prospectionService.createChecklistAddress(addressDocument, transaction);
            await prospectionService.deleteAllTokenDocument(addressDocument.idProspection, transaction);
            await prospectionService.updateStatusProsepction(addressDocument.idProspection, 1, 10, 11, transaction);
            const messageNotification = await notificationService.createMessage(addressDocument.idProspection, 2)
            await notificationService.prospectionNotification(addressDocument.idProspection, 1, 2, "Envio Documentação", messageNotification.sendDoc, transaction) 

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

    async updateContractorDocument(req: Request, res: Response): Promise<Response> {

        const document = req.body;
        const files = req.files;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.documentationUpdateValidation(document);

            if(document.isNew === "true"){
                const newDocContractorId = await prospectionService.insertContractorDocumentation(document, document.idDocumentation, transaction);
                await prospectionService.insertContractorDocumentationFiles(document, files, newDocContractorId, transaction);
            }else{
                await prospectionService.updateContractorDocumentation(document, transaction);
                await prospectionService.updateContractorDocumentationFiles(document, files, document.id, transaction);
            }

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

    async updateIntervening(req: Request, res: Response): Promise<Response> {

        const doc = req.body;
        const files = req.files;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.documentationUpdateInterveningValidation(doc);

            if(doc.isNew === "true"){
                const newDocInterveningId = await prospectionService.insertInterveningDocumentation(doc, doc.idDocumetation, transaction);
                await prospectionService.insertInterveningDocumentationFiles(doc, files, newDocInterveningId, transaction);
            }else{
                await prospectionService.updateInterveningDocumentation(doc, transaction);
                await prospectionService.updateInterveningDocumentationFiles(doc, files, doc.id, transaction);
            }

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

    async updateBankDocument(req: Request, res: Response): Promise<Response> {

        const bankDocument = req.body;
        const file = req.file;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.checklistUpdateBankValidation(bankDocument);

            if(bankDocument.isNew == "true"){
                await prospectionService.createChecklistBank(bankDocument, file, transaction);
            }else{
                await prospectionService.updateChecklistBank(bankDocument, file, transaction);
            }

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

    async updateAddressDocument(req: Request, res: Response): Promise<Response> {

        const addressDocument = req.body;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.checklistAddressValidation(addressDocument);

            await prospectionService.updateChecklistAddress(addressDocument, transaction);
            await prospectionService.updateStatusProsepction(addressDocument.idProspection, 1, 10, 11, transaction);
            
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

    async approvalDocument(req: Request, res: Response): Promise<Response> {

        const document = req.body;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.validateApprovalValidation(document);

            await prospectionService.approvalDocument(document, transaction);

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

    // ******** GET ********

    async validateTokenDocument(req: Request, res: Response): Promise<Response> {

        const token = req.params.token;

        try {

            const returnValidate = await prospectionService.validateTokenDocument(token);

            return res.json(returnValidate);
            
        } catch (error) {
            
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getDocumentation(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;

        try {

            const returnValidate = await prospectionService.getAllDocumentation(idProspection);

            return res.json(returnValidate);
            
        } catch (error) {
            
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

}

export default ProspectionDocumentationController;