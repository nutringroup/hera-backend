import { Router } from 'express';
import middleware from '../app/middlewares/auth';
import MonitoringController from '../app/modules/influencer/monitoring/controller/monitoring_controller';

import multer from 'multer';
import multerConfig from '../config/multer';
const upload = multer(multerConfig);

const monitoringController = new MonitoringController();
const routes = Router();

// ******** ROADMAP ********

routes.get('/get-all-roadmap-by-wording/:status', middleware.validatePolicy('/monitoring-roadmap'), monitoringController.getAllRoadmapByWording);
routes.post('/roadmap-wording', upload.array('files', 5), middleware.validatePolicy('/monitoring-roadmap'), monitoringController.createMonitoringWording);
routes.get('/get-all-material-files/:idRoadmap', middleware.validatePolicy('/monitoring-roadmap'), monitoringController.getAllRoadmapMaterialByRoadmap);
routes.get('/get-all-publication', middleware.validatePolicy('/monitoring-roadmap'), monitoringController.getAllPublication);

export default routes;