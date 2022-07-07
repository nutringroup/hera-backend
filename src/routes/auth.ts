import { Router } from "express";

import AuthUserAccessController from '../app/modules/auth/controllers/auth_user_access_controller';
import ExpressBrute from "express-brute";
import authMiddleware from  '../app/middlewares/auth';
import AuthController from "../app/modules/auth/controllers/auth_controller";

const routes = Router();
const authController = new AuthController();
const authUserAccessController = new AuthUserAccessController();

var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store);

routes.post('/login', authController.validateAccessAndCreateTokenToLogin); 
routes.post('/validate-token', authController.validateTokenAndLogin); 
routes.get('/menu', authMiddleware.validateWithoutPolicy() , authUserAccessController.getUserMenu);

routes.get("/validate-token/:token", bruteforce.prevent, authUserAccessController.validateTokenFirstAccess);
routes.put("/active-user", authUserAccessController.createFirstAccess);

export default routes;
