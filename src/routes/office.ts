import { Router } from 'express';
import OfficeController from '../app/modules/profile/office/controllers/office_controller';
const officeController = new OfficeController();
import middleware from '../app/middlewares/auth';

const routes = Router();

routes.post('/create', middleware.validatePolicy('/admin/cargos'), officeController.create);
routes.post('/createOfficeSector', middleware.validatePolicy('/admin/cargo-setor'), officeController.createOfficeSector);
routes.get('/getAll', middleware.validatePolicy('/admin/cargos'), officeController.getAll);
routes.get('/getAllOfficeSector', middleware.validatePolicy('/admin/cargo-setor'), officeController.getAllOfficeSector);
routes.put('/update', middleware.validatePolicy('/admin/cargos'), officeController.update);
routes.delete('/delete/:id', middleware.validatePolicy('/admin/cargos'), officeController.delete);
routes.delete('/deleteOfficeSector/:id', middleware.validatePolicy('/admin/cargo-setor'), officeController.deleteOfficeSector);

export default routes;