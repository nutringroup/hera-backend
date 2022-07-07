import { Router } from 'express';   
import middleware from '../app/middlewares/auth';
import ProspectionController from '../app/modules/influencer/prospection/controller/prospection_controller';
import ProspectionLegalController from '../app/modules/influencer/prospection/controller/prospection_legal_controller';
import ProspectionChecklistController from '../app/modules/influencer/prospection/controller/prospection_checklist_controller';
import ProspectionDistractionController from '../app/modules/influencer/prospection/controller/prospection_distraction_controller';
import ProspectionAdditiveTermController from '../app/modules/influencer/prospection/controller/prospection_additive_term_controller';
import multer from 'multer';
import multerConfig from '../config/multer';

const prospectionController = new ProspectionController();
const prospectionLegalController = new ProspectionLegalController();
const prospectionChecklistController = new ProspectionChecklistController();
const prospectionDistractionController = new ProspectionDistractionController();
const prospectionAdditiveTermController = new ProspectionAdditiveTermController()

const upload = multer(multerConfig);

const routes = Router();

routes.post('/upload-contract', upload.single('file'), middleware.validatePolicy('/prospeccao-juridico'), prospectionChecklistController.createContract);

routes.get('/getAll-legal/:status', middleware.validatePolicy('/prospeccao-juridico'), prospectionLegalController.getAll);
routes.put('/approval-contract', middleware.validatePolicy('/prospeccao-juridico'), prospectionLegalController.approvalContract); 

routes.get('/mapping/:idProspection', middleware.validatePolicy('/prospeccao-juridico'), prospectionController.getMapping);
routes.get('/first-contact/:idProspection', middleware.validatePolicy('/prospeccao-juridico'), prospectionController.getFirstContact);
routes.get('/negotiation/:idProspection', middleware.validatePolicy('/prospeccao-juridico'), prospectionController.getNegotiation);
routes.get('/details-information/:idProspection', middleware.validatePolicy('/prospeccao-juridico'), prospectionController.getDetailsInformations);
routes.get('/status-step/:idProspection', middleware.validatePolicy('/prospeccao-juridico'), prospectionController.getSetpStatus);
routes.get('/user-changed/:idProspection', middleware.validatePolicy('/prospeccao-juridico'), prospectionController.getUserChanged);
routes.get('/getCommentsEmailsContract/:idProspection', middleware.validatePolicy('/prospeccao-juridico'), prospectionChecklistController.getCommentsEmailsContract);
routes.get('/contract/:idProspection', prospectionChecklistController.getContractOrChecklist);
routes.get('/form-info-social/:idProspection', middleware.validatePolicy('/prospeccao-juridico'), prospectionChecklistController.getFormChecklist);
routes.get('/getContract/:idProspection', middleware.validatePolicy('/prospeccao-juridico'), prospectionChecklistController.getContract);
routes.get('/getChecklist/:idProspection', middleware.validatePolicy('/prospeccao-juridico'), prospectionChecklistController.getChecklist);
routes.get('/getPayment/:idProspection', middleware.validatePolicy('/prospeccao-juridico'), prospectionChecklistController.getPayment);
routes.get('/error-contract/:idProspection', middleware.validatePolicy('/prospeccao-juridico'), prospectionLegalController.getErrorContract);

routes.put('/upload-update-contract', upload.single('file'), middleware.validatePolicy('/prospeccao-juridico'), prospectionChecklistController.updateContract);
routes.put('/send-sign-email', middleware.validatePolicy('/prospeccao-juridico'), prospectionLegalController.sendSignEmailContract);
routes.put('/signature-contract', upload.single('file'), middleware.validatePolicy('/prospeccao-juridico'), prospectionLegalController.signatureApprovalContract); 

// ******** distraction ********

routes.get('/distraction-all', middleware.validatePolicy('/prospeccao-juridico'), prospectionDistractionController.getAll);
routes.post('/approval-distraction', middleware.validatePolicy('/prospeccao-juridico'), prospectionDistractionController.approvalDistraction);
// ==== ADDITIVE TERM ====

routes.get('/getAllAdditiveTerm', middleware.validatePolicy('/prospeccao-juridico'),prospectionAdditiveTermController.getAllAdditiveTermByLegal)
routes.put('/validateLegalAdditiveTerm', middleware.validatePolicy('/prospeccao-juridico'),prospectionAdditiveTermController.validateLegalAdditiveTerm)


export default routes;