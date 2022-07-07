import { Router } from 'express';
import ModuleController from '../app/modules/profile/module/controllers/module_controller';
const moduleController = new ModuleController();

const routes = Router();

routes.post('/create' , moduleController.create);
routes.get('/get' , moduleController.getAll);
routes.get('/getPages/:id' , moduleController.getPagesByIdModule);

export default routes;