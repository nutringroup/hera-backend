import { Router } from 'express';
import UserController from '../app/modules/profile/user/controllers/user_controller';
import middleware from '../app/middlewares/auth';

const userController = new UserController();
const routes = Router();

routes.post('/create', middleware.validatePolicy('/admin/usuarios'), userController.create);
routes.get('/getAll', middleware.validatePolicy('/admin/usuarios'), userController.getAll);
routes.put('/change-password', middleware.validatePolicy('/'), userController.changePasswordProfile);
routes.post('/recovery-password', userController.recoveryPassword);

export default routes;