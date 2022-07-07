import { Router } from 'express';
import SectorController from '../app/modules/profile/sector/controllers/sector_controller';
const sectorController = new SectorController();
import middleware from '../app/middlewares/auth';

const routes = Router();

routes.post('/create', middleware.validatePolicy('/admin/setores'), sectorController.create);
routes.get('/getAll', middleware.validatePolicy('/admin/setores'), sectorController.getAll);
routes.put('/update', middleware.validatePolicy('/admin/setores'), sectorController.update);
routes.delete('/delete/:id', middleware.validatePolicy('/admin/setores'), sectorController.delete);

export default routes;