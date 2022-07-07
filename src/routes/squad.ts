import { Router } from 'express';
import SquadController from '../app/modules/influencer/squad/controllers/squad_controller';
const squadController = new SquadController();
import middleware from '../app/middlewares/auth';

const routes = Router();

routes.get('/get', middleware.validatePolicy('/squad'), squadController.getAll);
routes.get('/getUsers', middleware.validatePolicy('/squad'), squadController.getUsers);
routes.get('/getProducts', middleware.validatePolicy('/squad'), squadController.getProducts);
routes.get('/getTypes', middleware.validatePolicy('/squad'), squadController.getTypesIfluencer);

routes.post('/create', middleware.validatePolicyInfluencer('/squad', false), squadController.create);
routes.post('/create-user-squad', middleware.validatePolicyInfluencer('/squad', true), squadController.createUserSquad);

routes.get('/detail/:idSquad', middleware.validatePolicy('/squad'), squadController.getDetail);
routes.get('/teamleader/:idSquad', middleware.validatePolicy('/squad'), squadController.getTeamLeaders);
routes.delete('/user-squad/:idSquad/:idUser', middleware.validatePolicyInfluencer('/squad', true), squadController.deleteUserSquad);
routes.get('/user-squad-prospection/:idSquad', middleware.validatePolicy('/squad'), squadController.getUsersProspectionBySquad);
routes.get('/user-squad-monitoring/:idSquad', middleware.validatePolicy('/squad'), squadController.getUsersMonitoringBySquad);
routes.get('/user-teamleader', middleware.validatePolicy('/squad'), squadController.getUsersTeamLeader);
routes.get('/user-teamleader/:idSquad', middleware.validatePolicy('/squad'), squadController.getUsersTeamLeader);
routes.put('/change-teamleader', middleware.validatePolicyInfluencer('/squad', true), squadController.changeTeamLeaderSquad);
routes.put('/change-name', middleware.validatePolicyInfluencer('/squad', true), squadController.changeNameSquad);

export default routes;