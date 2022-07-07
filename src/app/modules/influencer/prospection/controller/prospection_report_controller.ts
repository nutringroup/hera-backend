import { Request, Response } from "express";
import prospectionReportService from "../shared/services/prospection_report_service";
import SequelizeConnect  from '../../../../../config/sequelize_request';
import ProspectionError from "../../../../shared/exceptions/prospection/prospection_exception";
const sequelize = SequelizeConnect.sequelizeConnect;  

class ProspectionReportConroller {

    // ******** GET ********

    async getReport(req: Request, res: Response): Promise<Response> {

        const idUser = req.idUser;
        const initialDate = req.params.initialDate;
        const finalDate = req.params.finalDate;
        const typeInfluencer: number[] = JSON.parse(req.params.typeInfluencer);
        const segment: number[] = JSON.parse(req.params.segment);
        const product = JSON.parse(req.params.product);
        const user = JSON.parse(req.params.idUser);

        try {

            const prospectionList = await prospectionReportService.getProspectionReport(initialDate, finalDate, typeInfluencer, segment, product, idUser, user);
            return res.json(prospectionList);
            
        } catch (error) {
            if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

}

export default ProspectionReportConroller;