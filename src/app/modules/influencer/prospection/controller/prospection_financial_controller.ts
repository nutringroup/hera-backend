import { Request, Response } from "express";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";
import prospectionService from "../shared/services/prospection_service";
import prospectionValidation from "../shared/validations/prospection_validation";
import ProspectionError from "../../../../shared/exceptions/prospection/prospection_exception";

import SequelizeConnect  from '../../../../../config/sequelize_request';
import auth_service from "../../../auth/shared/services/auth_service";
const sequelize = SequelizeConnect.sequelizeConnect; 

class ProspectionFinancialController {

    // ******** POST ********

    async paymentRequest(req: Request, res: Response): Promise<Response> {

        const payment = req.body;

        try {

            await prospectionValidation.paymentRequest(payment);

            await prospectionService.paymentRequest(payment);
            
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

    // ******** PUT ********

    async confirmPayment(req: Request, res: Response): Promise<Response> {

        const payment = req.body;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.confirmPayment(payment);

            await prospectionService.confirmPayment(payment, transaction);
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

    async approvalPayment(req: Request, res: Response): Promise<Response> {

        const idUser = req.idUser;
        const payment = req.body;
        const transaction = await sequelize.transaction();

        try {

            await prospectionValidation.approvalPayment(payment);

            await prospectionService.approvalPayment(payment, idUser, transaction);
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

    async getAllPaymentsAvailable(req: Request, res: Response): Promise<Response> {

        const month = req.params.month;

        try {

           const paymentsList = await prospectionService.getPaymentsAvailable(month);
            
            return res.json(paymentsList);
            
        } catch (error) {
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getDetailsPayments(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;

        try {

           const paymentsList = await prospectionService.detailsPayments(Number(idProspection));
            
            return res.json(paymentsList);
            
        } catch (error) {
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getPaymentRequestFinancial(req: Request, res: Response): Promise<Response> {

        try {

           const paymentsList = await prospectionService.getPaymentRequest();
            
            return res.json(paymentsList);
            
        } catch (error) {
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getPaymentRequestFinancialTeamLeader(req: Request, res: Response): Promise<Response> {

        const idUser = req.idUser;

        try {

           const paymentsList = await prospectionService.getPaymentRequestTeamLeader(idUser);
            
            return res.json(paymentsList);
            
        } catch (error) {
            console.log(error)
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getPaymentPaid(req: Request, res: Response): Promise<Response> {

        const month = req.params.month;

        try {

            const paymentsList = await prospectionService.getPaymentsPaid(month);
            
            return res.json(paymentsList);
            
        } catch (error) {
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getPaymentPaidInfluencer(req: Request, res: Response): Promise<Response> {

        const month = req.params.month;
        const idUser = req.idUser

        try {

            const paymentsList = await prospectionService.getPaymentsPaidInfluencer(month, idUser);
            
            return res.json(paymentsList);
            
        } catch (error) {
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getPaymentLog(req: Request, res: Response): Promise<Response> {

        const idProspectionFinancial = req.params.idProspectionFinancial;

        try {

           const paymentsList = await prospectionService.getPaymensLog(Number(idProspectionFinancial));
            
            return res.json(paymentsList);
            
        } catch (error) {
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getBankDocument(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;

        try {

           const bankList = await prospectionService.getBankDocument(Number(idProspection));
            
            return res.json(bankList);
            
        } catch (error) {
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

}

export default ProspectionFinancialController;