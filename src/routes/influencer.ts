import { Router } from 'express';
import InfluencerController from '../app/modules/influencer/influencer_client/controllers/influencer_controller';
import middleware from '../app/middlewares/auth';

const influencerController = new InfluencerController();

const routes = Router();

routes.get('/getAll', middleware.validatePolicy('/influencer'), influencerController.getAll);
routes.get('/getByName/:name', middleware.validatePolicy('/influencer'), influencerController.getByName);
routes.get('/getTrackFollowers', middleware.validatePolicy('/influencer'), influencerController.getAllTrackFollowers);
routes.get('/getSegment', middleware.validatePolicy('/influencer'), influencerController.getAllSegments);
routes.post('/create', middleware.validatePolicy('/influencer'), influencerController.create);

routes.get('/getAllProducts/:id', middleware.validatePolicy('/influencer'), influencerController.getAllProductsUsedByInfluencer);
routes.get('/getAllUserAndStatus/:id', middleware.validatePolicy('/influencer'), influencerController.getAllUserAndStatusUsedByInfluencer);
routes.get('/getAllProducts', middleware.validatePolicy('/influencer'), influencerController.getAllProducts);
routes.get('/getAllProductsAvaiable/:id', middleware.validatePolicy('/influencer'), influencerController.getAllProductsAvaiableByInfluencer);
routes.get('/validateProductInfluencer/:idInfluencer/:idProduct', middleware.validatePolicy('/influencer'), influencerController.verifyProductsExistingInfluencer);
routes.get('/getAllByUser', middleware.validatePolicy('/influencer'), influencerController.getAllByUser);
routes.get('/getDetailByInfluencer/:idInfluencer', middleware.validatePolicy('/influencer'), influencerController.getDetailByUser);

export default routes;