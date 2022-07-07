import { Request, Response } from "express";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";
import prospectionDistractionService from "../shared/services/prospection_distraction_service";
import prospectionDistractionValidation from "../shared/validations/prospection_distraction_validation";
import ProspectionError from "../../../../shared/exceptions/prospection/prospection_exception";
import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;  

class ProspectionDistractionConroller {

    // ******** POST ********

    async create(req: Request, res: Response): Promise<Response> {

        const distraction = req.body;
        const file = req.file;

        try {

            await prospectionDistractionValidation.createDistractionValidation(distraction);
            await prospectionDistractionService.createDistraction(distraction, file);

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

    async approvalDistraction(req: Request, res: Response): Promise<Response> {

        const distraction = req.body;

        try {

            await prospectionDistractionValidation.approvalDistractionValidation(distraction);
            await prospectionDistractionService.approvalDistraction(distraction);

            return res.json(true);
            
        } catch (error) {
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async uploadDistraction(req: Request, res: Response): Promise<Response> {

        const distraction = req.body;
        const file = req.file;
        const transactionDistraction = await sequelize.transaction();

        try {

            await prospectionDistractionValidation.uploadDistractionValidation(distraction);
            await prospectionDistractionService.uploadDistractionAndConfirmDistraction(file, distraction, transactionDistraction);

            await transactionDistraction.commit();

            return res.json(true);
            
        } catch (error) {
            await transactionDistraction.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    // ******** PUT ********

    async updateMediaValue(req: Request, res: Response): Promise<Response> {

        const payment = req.body;

        try {   

            await prospectionDistractionValidation.updateMediaValueValidation(payment);
            await prospectionDistractionService.updateMediaValue(payment);

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

            const distractionList =  await prospectionDistractionService.getAll(req.idUser);

            return res.json(distractionList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async getParcelPayment(req: Request, res: Response): Promise<Response> {

        const idProspection = Number(req.params.idProspection);

        try {   

            const mediaValue =  await prospectionDistractionService.getParcelPayment(idProspection);

            return res.json({ mediaValue: mediaValue });
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }


}

export default ProspectionDistractionConroller;