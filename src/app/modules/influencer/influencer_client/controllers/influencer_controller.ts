import { Request, Response } from "express";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";
import SquadInfluencerError from "../../../../shared/exceptions/squad/squad_influencer_exception";
import Segment from "../shared/models/segment";
import TrackFollowers from "../shared/models/track_followers";
import influencerService from "../shared/services/influencer_service";
import influencerValidation from "../shared/validations/influencer_validation";

class InfluencerController {

    // ******** POST ********

    async create(req: Request, res: Response): Promise<Response>{

        const influencer = req.body;
        const idUser = req.idUser;

        try {

            await influencerValidation.createValidation(influencer);
            await influencerService.createNewInfluencer(influencer, idUser);

            return res.json(true);
            
        } catch (error) {
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof SquadInfluencerError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    // ******** GET ********

    async getAll(req: Request, res: Response): Promise<Response>{

        const idUser = req.idUser;

        try {

            const influencerList = await influencerService.getAllInfluencersAvailable(idUser);
            return res.json(influencerList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getByName(req: Request, res: Response): Promise<Response>{

        const nameInfluencer = req.params.name;
        const idUser = req.idUser;

        try {

            const influencerList = await influencerService.getAllInfluencersAvailable(idUser, nameInfluencer);

            return res.json(influencerList);
            
        } catch (error) {
            if(error instanceof SquadInfluencerError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
            }

    }

    async getAllTrackFollowers(req: Request, res: Response): Promise<Response>{

        try {

            const trackFollowersList = await TrackFollowers.findAll({ attributes: ['id', 'description'], order: ['id'] });
            return res.json(trackFollowersList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getAllSegments(req: Request, res: Response): Promise<Response>{

        try {

            const segmentList = await Segment.findAll({ attributes: ['id', 'name'], order: ['name'] });
            return res.json(segmentList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getAllProductsUsedByInfluencer(req: Request, res: Response): Promise<Response>{ 

        const idInfluencer = req.params.id;

        try {

            const productInfluencerList = await influencerService.allProductsUsedByInfluencer(Number(idInfluencer), 0);
            return res.json(productInfluencerList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getAllUserAndStatusUsedByInfluencer(req: Request, res: Response): Promise<Response>{ 

        const idInfluencer = req.params.id;

        try {

            const userInfluencerList = await influencerService.allUserAndStatusUsedByInfluencer(Number(idInfluencer));
            return res.json(userInfluencerList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getAllProductsAvaiableByInfluencer(req: Request, res: Response): Promise<Response>{ 

        const idInfluencer = req.params.id;

        try {

            const productInfluencerList = await influencerService.allProductsAvaiableByInfluencer(Number(idInfluencer));
            return res.json(productInfluencerList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getAllProducts(req: Request, res: Response): Promise<Response>{ 

        try {

            const productInfluencerList = await influencerService.allProducts();
            return res.json(productInfluencerList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async verifyProductsExistingInfluencer(req: Request, res: Response): Promise<Response>{

        const idInfluencer = req.params.idInfluencer;
        const idProduct = req.params.idProduct;

        try {

            const productInfluencerList = await influencerService.allProductsUsedByInfluencer(Number(idInfluencer), 0);
            await influencerService.validateProductsInInfluencer(Number(idProduct), [], productInfluencerList);

            return res.json(true);
            
        } catch (error) {
            if(error instanceof SquadInfluencerError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
            }

    }

    async getAllByUser(req: Request, res: Response): Promise<Response>{

        const idUser = req.idUser;

        try {

            const influencerList = await influencerService.getAllCreatedByUser(idUser);
            return res.json(influencerList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getDetailByUser(req: Request, res: Response): Promise<Response>{

        const idInfluencer = Number(req.params.idInfluencer);

        try {

            const influencerList = await influencerService.getDetailByUser(idInfluencer);
            return res.json(influencerList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

}

export default InfluencerController;