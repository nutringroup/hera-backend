import { Router } from 'express';
import ProspectionFinancialController from '../app/modules/influencer/prospection/controller/prospection_financial_controller';
import middleware from '../app/middlewares/auth';

import multer from 'multer';
import multerConfig from '../config/multer';
const upload = multer(multerConfig);

const prospectionFinancialController = new ProspectionFinancialController();

const routes = Router();

routes.get('/get-payments-available/:month', middleware.validatePolicy('/influencer-payment'), prospectionFinancialController.getAllPaymentsAvailable);
routes.get('/details-payments/:idProspection', middleware.validatePolicy('/influencer-payment'), prospectionFinancialController.getDetailsPayments);
routes.get('/get-payments-request', middleware.validatePolicy('/influencer-payment'), prospectionFinancialController.getPaymentRequestFinancial);
routes.get('/get-payments-paid/:month', middleware.validatePolicy('/influencer-payment'), prospectionFinancialController.getPaymentPaid);
routes.get('/get-payments-log/:idProspectionFinancial', middleware.validatePolicy('/influencer-payment'), prospectionFinancialController.getPaymentLog);
routes.get('/get-detail-bank-information/:idProspection', middleware.validatePolicy('/influencer-payment'), prospectionFinancialController.getBankDocument);
routes.put('/upload-date-nf',upload.single('file'), middleware.validatePolicy('/influencer-payment'), prospectionFinancialController.submitDatesAndNfFinancial);

routes.post('/payment-request', middleware.validatePolicy('/influencer-payment'), prospectionFinancialController.paymentRequest);
routes.post('/many-payment-request', middleware.validatePolicy('/influencer-payment'), prospectionFinancialController.manyPaymentRequest);
routes.put('/confirm-payment', middleware.validatePolicy('/influencer-payment'), prospectionFinancialController.confirmPayment);


export default routes;