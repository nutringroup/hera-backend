import { Request, Response } from "express";
import typeInfluencerService from "../shared/services/type_influencer_service";

class TypeInfluencerController {

    async getAll(req: Request, res: Response): Promise<Response>{

        try {

            const typeList = await typeInfluencerService.getAll();
            return res.json(typeList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

}

export default TypeInfluencerController;