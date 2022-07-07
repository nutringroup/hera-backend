import { Router } from 'express';
import ProspectionController from '../app/modules/influencer/prospection/controller/prospection_controller';
import middleware from '../app/middlewares/auth';
import TypeInfluencerController from '../app/modules/influencer/type_influencer/controllers/type_influencer_controller';
import ProspectionChecklistController from '../app/modules/influencer/prospection/controller/prospection_checklist_controller';
import ProspectionFinancialController from '../app/modules/influencer/prospection/controller/prospection_financial_controller';
import ProspectionDistractionController from '../app/modules/influencer/prospection/controller/prospection_distraction_controller';
import ProspectionRenovationController from '../app/modules/influencer/prospection/controller/prospection_renovation_controller';
import ProspectionAdditiveTermController from '../app/modules/influencer/prospection/controller/prospection_additive_term_controller';
import ProspectionReportController from '../app/modules/influencer/prospection/controller/prospection_report_controller';

import multer from 'multer';
import multerConfig from '../config/multer';
import ProspectionDocumentationController from '../app/modules/influencer/prospection/controller/prospection_documentation';
const upload = multer(multerConfig);

const prospectionController = new ProspectionController();
const prospectionChecklistController = new ProspectionChecklistController();
const prospectionDocumentationController = new ProspectionDocumentationController();
const typeInfluencerController = new TypeInfluencerController();
const prospectionFinancialController = new ProspectionFinancialController();
const prospectionDistractionController = new ProspectionDistractionController();
const prospectionRenovationController = new ProspectionRenovationController();
const prospectionAdditiveTermController = new ProspectionAdditiveTermController();
const prospectionReportController = new ProspectionReportController();

const routes = Router();

routes.get('/getSquad', middleware.validatePolicy('/squad'), prospectionController.getAllSquad);
routes.get('/getLocation', middleware.validatePolicy('/squad'), prospectionController.getAllLocation);
routes.get('/getAge', middleware.validatePolicy('/squad'), prospectionController.getAllAgeGroup);
routes.get('/getExclusivity', middleware.validatePolicy('/squad'), prospectionController.getAllExclusivity);
routes.get('/getAll/:idSquad/:initialDate/:finalDate/:status/:typeInfluencer/:instagramName/:product/:idUser/:filter', middleware.validatePolicy('/squad'), prospectionController.getAll);
routes.get('/getStatus', middleware.validatePolicy('/squad'), prospectionController.getAllStatus);
routes.get('/getType', middleware.validatePolicy('/squad'), typeInfluencerController.getAll);
routes.post('/create', middleware.validatePolicy('/squad'), prospectionController.create);
routes.post('/create-first-contact', middleware.validatePolicy('/squad'), prospectionController.createFirstContact);
routes.post('/create-negotiation', middleware.validatePolicy('/squad'), prospectionController.createNegotiation); 
routes.put('/first-contact', middleware.validatePolicy('/squad'), prospectionController.updateFirstContact);
routes.put('/negotiation', middleware.validatePolicy('/squad'), prospectionController.updateNegotiation);
routes.get('/mapping/:idProspection', middleware.validatePolicy('/squad'), prospectionController.getMapping);
routes.get('/first-contact/:idProspection', middleware.validatePolicy('/squad'), prospectionController.getFirstContact);
routes.get('/negotiation/:idProspection', middleware.validatePolicy('/squad'), prospectionController.getNegotiation);
routes.get('/details-information/:idProspection', middleware.validatePolicy('/squad'), prospectionController.getDetailsInformations);
routes.get('/status-step/:idProspection', middleware.validatePolicy('/squad'), prospectionController.getSetpStatus);
routes.put('/request-approval', middleware.validatePolicy('/squad'), prospectionController.requestApprovalProspection); 
routes.put('/approval', middleware.validatePolicyInfluencer('/squad', false), prospectionController.validateApprovalProspection); 
routes.put('/disapprove', middleware.validatePolicyInfluencer('/squad', false), prospectionController.disapproveProspection);
routes.put('/change-user', middleware.validatePolicyInfluencer('/squad', true), prospectionController.changeUserProspecion);
routes.get('/user-changed/:idProspection', middleware.validatePolicy('/squad'), prospectionController.getUserChanged);
routes.put('/change-status-prospection', middleware.validatePolicy('/squad'), prospectionController.changeStatusProspection)
routes.get('/getLogChangedStatus/:idProspection', middleware.validatePolicy('/squad'), prospectionController.getLogChangedStatusProspection)
routes.get('/get-user-prospection', middleware.validatePolicy('/squad'), prospectionController.getUserProspection);

// ******** routes of documentation ********

routes.post('/create-token', middleware.validatePolicy('/squad'), prospectionDocumentationController.createTokenDocumentation);
routes.get('/validate-token/:token', prospectionDocumentationController.validateTokenDocument);
routes.post('/documentation', upload.array('files', 5), prospectionDocumentationController.create); 
routes.put('/documentation-update', upload.array('files', 5), prospectionDocumentationController.updateContractorDocument);
routes.post('/documentation-intervening', upload.array('files', 10), prospectionDocumentationController.createIntervening);
routes.put('/documentation-intervening-update', upload.array('files', 10), prospectionDocumentationController.updateIntervening);
routes.post('/bank-document', upload.single('file'), prospectionDocumentationController.createBankDocument);
routes.put('/bank-document-update', upload.single('file'), prospectionDocumentationController.updateBankDocument);
routes.post('/address-document', prospectionDocumentationController.createAddressDocument); 
routes.put('/address-document-update', prospectionDocumentationController.updateAddressDocument);
routes.put('/approval-document', middleware.validatePolicy('/squad'), prospectionDocumentationController.approvalDocument);
routes.get('/documentation/:idProspection', prospectionDocumentationController.getDocumentation);
routes.put('/signature-contract', upload.single('file'), middleware.validatePolicy('/squad'), prospectionController.signatureApprovalContract);

// ******** routes of checklist ********

routes.get('/contract/:idProspection', prospectionChecklistController.getContractOrChecklist);
routes.get('/form-info-social/:idProspection', middleware.validatePolicy('/squad'), prospectionChecklistController.getFormChecklist);
routes.get('/getContract/:idProspection', middleware.validatePolicy('/squad'), prospectionChecklistController.getContract);
routes.get('/getChecklist/:idProspection', middleware.validatePolicy('/squad'), prospectionChecklistController.getChecklist);
routes.get('/getPayment/:idProspection', middleware.validatePolicy('/squad'), prospectionChecklistController.getPayment);
routes.post('/create-checklist', middleware.validatePolicy('/squad'), prospectionChecklistController.create);
routes.post('/upload-contract', upload.single('file'), middleware.validatePolicy('/squad'), prospectionChecklistController.createContract);
routes.post('/upload-checklist', upload.single('file'), middleware.validatePolicy('/squad'), prospectionChecklistController.createChecklistFile);
routes.post('/create-payment', middleware.validatePolicy('/squad'), prospectionChecklistController.createProspectionFinancial); 
routes.put('/influencer-validate-contract', middleware.validatePolicy('/squad'), prospectionChecklistController.influencerApprovalContract);
routes.put('/send-influencer-contract', middleware.validatePolicy('/squad'), prospectionChecklistController.sendInfluencerContract);
routes.put('/upload-update-contract', upload.single('file'), middleware.validatePolicy('/squad'), prospectionChecklistController.updateContract);
routes.put('/update-checklist', middleware.validatePolicy('/squad'), prospectionChecklistController.updateChecklist);
routes.put('/update-payment', middleware.validatePolicy('/squad'), prospectionChecklistController.updateProspectionFinancial);

// ******** routes of financial ********

routes.get('/payment-request', middleware.validatePolicy('/squad'), prospectionFinancialController.getPaymentRequestFinancialTeamLeader);
routes.get('/get-payments-paid-influencer/:month', middleware.validatePolicy('/squad'), prospectionFinancialController.getPaymentPaidInfluencer);
routes.get('/get-payments-log-influencer/:idProspectionFinancial', middleware.validatePolicy('/squad'), prospectionFinancialController.getPaymentLog);
routes.get('/get-detail-payments-influencer/:idProspection', middleware.validatePolicy('/squad'), prospectionFinancialController.getDetailsPayments);
routes.put('/approval-payment-request', middleware.validatePolicyInfluencer('/squad', false), prospectionFinancialController.approvalPayment);
routes.get('/get-detail-bank-information-influencer/:idProspection', middleware.validatePolicy('/squad'), prospectionFinancialController.getBankDocument);

// ******** distraction ********

routes.post('/distraction', upload.single('file'), middleware.validatePolicy('/squad'), prospectionDistractionController.create);
routes.get('/distraction-all', middleware.validatePolicy('/squad'), prospectionDistractionController.getAll);
routes.post('/approval-distraction', middleware.validatePolicyInfluencer('/squad', true), prospectionDistractionController.approvalDistraction);
routes.get('/parcel-payment/:idProspection', middleware.validatePolicy('/squad'), prospectionDistractionController.getParcelPayment);
routes.put('/parcel-payment', middleware.validatePolicy('/squad'), prospectionDistractionController.updateMediaValue);
routes.post('/upload-distraction',upload.single('file'), middleware.validatePolicy('/squad'), prospectionDistractionController.uploadDistraction);

// ******** routes of renovation ********

routes.post('/renovation', upload.single('file'), middleware.validatePolicy('/squad'), prospectionRenovationController.create);
routes.get('/renovation-all', middleware.validatePolicy('/squad'), prospectionRenovationController.getAll);
routes.put('/approval-renovation', middleware.validatePolicy('/squad'), prospectionRenovationController.approvalRenovation);


// ******** routes of additive term ********

routes.get('/getAdditiveTerm', middleware.validatePolicy('/squad'), prospectionAdditiveTermController.getAdditiveTerm);

// ******** report ********

routes.get('/get-report/:initialDate/:finalDate/:typeInfluencer/:segment/:product/:idUser', middleware.validatePolicy('/squad'), prospectionReportController.getReport);

export default routes;