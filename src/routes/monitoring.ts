import { Router } from 'express';
import middleware from '../app/middlewares/auth';
import MonitoringController from '../app/modules/influencer/monitoring/controller/monitoring_controller';
import ProspectionAdditiveTermController from '../app/modules/influencer/prospection/controller/prospection_additive_term_controller';
import ProspectionController from '../app/modules/influencer/prospection/controller/prospection_controller'
import ProspectionChecklistController from '../app/modules/influencer/prospection/controller/prospection_checklist_controller'

import multer from 'multer';
import multerConfig from '../config/multer';
const upload = multer(multerConfig);

const monitoringController = new MonitoringController();
const prospectionAdditiveTermController = new ProspectionAdditiveTermController()
const prospectionController = new ProspectionController()
const prospectionChecklistController = new ProspectionChecklistController()
const routes = Router();

routes.get('/get-all/:idSquad', middleware.validatePolicy('/squad'), monitoringController.getAll);

routes.get('/get-all-publication-by-monitoring/:idMonitoring', middleware.validatePolicy('/squad'), monitoringController.getAllPublicationByMonitoring);
routes.get('/get-all-publication-by-user/:idUserMonitoring', middleware.validatePolicy('/squad'), monitoringController.getAllPublicationByUser);
routes.get('/get-all-publication-by-squad/:idSquad', middleware.validatePolicy('/squad'), monitoringController.getAllPublicationBySquad);
routes.get('/get-all-publication', middleware.validatePolicy('/squad'), monitoringController.getAllPublication);

// criar listagem das publicações de modo geral

routes.post('/new-user-monitoring', middleware.validatePolicyInfluencer('/squad', false), monitoringController.selectUserNewMonitoring);
routes.post('/create-publication', middleware.validatePolicy('/squad'), monitoringController.createPublication);
routes.put('/update-publication', middleware.validatePolicy('/squad'), monitoringController.updatePublication);
routes.post('/evaluation-publication', middleware.validatePolicyInfluencer('/squad', false), monitoringController.evaluationPublication);
routes.put('/update-link-tracking-publication', middleware.validatePolicy('/squad'), monitoringController.updateLinkTrakingPublication);
routes.delete('/delete-publication', middleware.validatePolicy('/squad'), monitoringController.deletePublication);

// ******** ROADMAP ********

routes.post('/new-roadmap', upload.single('file'), middleware.validatePolicy('/squad'), monitoringController.createRoadmap);
routes.get('/get-all-roadmap-by-user/:idMonitoring/:status', middleware.validatePolicy('/squad'), monitoringController.getAllRoadmapByUser);
routes.get('/get-all-roadmap-files/:idRoadmap', monitoringController.getAllRoadmapWordingFilesByRoadmap);
routes.post('/new-token-roadmap', middleware.validatePolicy('/squad'), monitoringController.createTokenRoadmap);
routes.get('/validate-token-roadmap/:token', monitoringController.validateTokenRoadmap);
routes.post('/roadmap-material', upload.array('files', 10), monitoringController.createMonitoringMaterial);
routes.get('/get-all-material-files/:idRoadmap', middleware.validatePolicy('/squad'), monitoringController.getAllRoadmapMaterialByRoadmap);
routes.put('/approval-material', middleware.validatePolicy('/squad'), monitoringController.approvalMaterial);

// ==== ADDITIVE TERM ====

routes.get('/get-reason-additive-term', middleware.validatePolicy('/squad'), prospectionAdditiveTermController.getReasonAdditiveTerm);
routes.post('/create-additive-term', upload.single('file'), middleware.validatePolicy('/squad'), prospectionAdditiveTermController.createAdditiveTerm);
routes.post('/upload-additive-term', upload.single('file'), middleware.validatePolicy('/squad'), prospectionAdditiveTermController.uploadAdditiveTerm);
routes.put('/validateMonitoringAdditiveTerm',  middleware.validatePolicy('/squad'), prospectionAdditiveTermController.validateMonitoringAdditiveTerm)

routes.put('/updateInstagramNameInfluencer',  middleware.validatePolicy('/squad'), prospectionAdditiveTermController.updateInstagramNameInfluencer)
routes.put('/negotiation', middleware.validatePolicy('/squad'), prospectionController.updateNegotiation);
routes.get('/negotiation/:idProspection', middleware.validatePolicy('/squad'), prospectionController.getNegotiation);
routes.put('/update-checklist', middleware.validatePolicy('/squad'), prospectionAdditiveTermController.updateChecklist);
routes.get('/form-info-social/:idProspection', middleware.validatePolicy('/squad'), prospectionChecklistController.getFormChecklist);
routes.put('/update-payment', middleware.validatePolicy('/squad'), prospectionAdditiveTermController.updateProspectionFinancial);
routes.get('/getPayment/:idProspection', middleware.validatePolicy('/squad'), prospectionChecklistController.getPayment); 


export default routes;