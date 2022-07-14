import { Request, Response } from "express";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";
import SquadError from "../../../../shared/exceptions/squad/squad_exception";
import prospectionService from "../shared/services/prospection_service";
import prospectionValidation from "../shared/validations/prospection_validation";
import userService from "../../../profile/user/shared/services/user_service";
import SquadInfluencerError from "../../../../shared/exceptions/squad/squad_influencer_exception";
import UserCodError from "../../../../shared/exceptions/user/user_cod_exception";
import ProspectionError from "../../../../shared/exceptions/prospection/prospection_exception";

import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;  

class ProspectionConroller {

    // ******** POST ********

    async create (req: Request, res: Response): Promise<Response> {

        const newProspection = req.body;
        const idUser = req.idUser;
        const transactionProspetion = await sequelize.transaction();

        try {

            await prospectionValidation.createValidation(newProspection);

            const userCod = await userService.validateCodUserInfluencer(idUser);
            await prospectionService.createNewProspection(newProspection, idUser, userCod, transactionProspetion);

            await transactionProspetion.commit();

            return res.json(true);
            
        } catch (error) {
            await transactionProspetion.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof SquadInfluencerError)
                return res.status(400).json({error: error.message});
            else if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else if(error instanceof UserCodError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async createFirstContact (req: Request, res: Response): Promise<Response> {

        const newProspection = req.body;
        const idUser = req.idUser;
        const transactionProspetion = await sequelize.transaction();

        try {

            await prospectionValidation.firstContactValidation(newProspection);
            await prospectionService.createProspectionFirstContact(newProspection, idUser, transactionProspetion);

            await transactionProspetion.commit();
            return res.json(true);
            
        } catch (error) {
            await transactionProspetion.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async createNegotiation (req: Request, res: Response): Promise<Response> {

        const newProspection = req.body;
        const idUser = req.idUser;
        const transactionProspetion = await sequelize.transaction();

        try {

            await prospectionValidation.negotiationValidation(newProspection);
            await prospectionService.createProspectionNegotiation(newProspection, idUser, transactionProspetion);
            await transactionProspetion.commit();
            return res.json(true);
            
        } catch (error) {
            
            await transactionProspetion.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof SquadInfluencerError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    // ******** PUT ********

    async requestApprovalProspection (req: Request, res: Response): Promise<Response> {

        const updateProspection = req.body;
        const transactionProspetion = await sequelize.transaction();
        const idUser = req.idUser

        try {

            await prospectionValidation.requestApprovalValidation(updateProspection);

            await prospectionService.requestApproval(updateProspection, idUser, transactionProspetion);
            await transactionProspetion.commit();
            return res.json(true);
            
        } catch (error) {
            await transactionProspetion.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async validateApprovalProspection (req: Request, res: Response): Promise<Response> {

        const updateProspection = req.body;
        const idUser = req.idUser;
        const transactionProspetion = await sequelize.transaction();

        try {

            await prospectionValidation.validateApprovalValidation(updateProspection);

            await prospectionService.updateApproval(updateProspection, idUser, transactionProspetion);
            await transactionProspetion.commit();
            return res.json(true);
            
        } catch (error) {
            await transactionProspetion.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async disapproveProspection (req: Request, res: Response): Promise<Response> {

        const updateProspection = req.body;
        const idUser = req.idUser;
        const transactionProspetion = await sequelize.transaction();

        try {

            await prospectionValidation.disapproveValidation(updateProspection);
            await prospectionService.disapproveProsepction(updateProspection, idUser, transactionProspetion);
            await transactionProspetion.commit();
            return res.json(true);
            
        } catch (error) {
            await transactionProspetion.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async updateFirstContact (req: Request, res: Response): Promise<Response> {

        const updateProspection = req.body;
        const idUser = req.idUser;
        const transactionProspetion = await sequelize.transaction();

        try {

            await prospectionValidation.firstContactValidation(updateProspection);
            await prospectionService.updateProspectionFirstContact(updateProspection, idUser, transactionProspetion);

            await transactionProspetion.commit();
            return res.json(true);
            
        } catch (error) {
            await transactionProspetion.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async updateNegotiation (req: Request, res: Response): Promise<Response> {

        const updateProspection = req.body;
        const idUser = req.idUser;
        const transactionProspetion = await sequelize.transaction();

        try {

            await prospectionValidation.negotiationValidation(updateProspection);
            await prospectionService.updateProspectionNegotiation(updateProspection, idUser, transactionProspetion);
            await transactionProspetion.commit();
            return res.json(true);
            
        } catch (error) {
            
            await transactionProspetion.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async changeUserProspecion (req: Request, res: Response): Promise<Response> {

        const prospection = req.body;
        const transactionProspetion = await sequelize.transaction();

        try {

            await prospectionValidation.changeUserProspectionValidation(prospection);
            await prospectionService.changeUserProspection(prospection, transactionProspetion);
            await transactionProspetion.commit();
            return res.json(true);
            
        } catch (error) {
            
            await transactionProspetion.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async signatureApprovalContract(req: Request, res: Response): Promise<Response> {

        const contract = req.body;
        const transaction = await sequelize.transaction();
        const idUser = req.idUser

        try {

            await prospectionValidation.validateApprovalContractValidation(contract);

            await prospectionService.signatureApprovalContract(contract, idUser, req.file, transaction);
            await transaction.commit();
            return res.json(true);
            
        } catch (error) {
            await transaction.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async changeStatusProspection (req: Request, res: Response): Promise<Response> {

        const prospection = req.body;
        const transactionProspetion = await sequelize.transaction();

        try {

            await prospectionValidation.changeStatusProspectionValidation(prospection);
            await prospectionService.changeStatusProspection(prospection, transactionProspetion);
            await transactionProspetion.commit();
            return res.json(true);
            
        } catch (error) {
            
            await transactionProspetion.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof ProspectionError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }
    
    // ******** GET ********

    async getAll(req: Request, res: Response): Promise<Response> {

        const idUser = req.idUser;
        const initialDate = req.params.initialDate;
        const finalDate = req.params.finalDate;
        const typeInfluencer = Number(req.params.typeInfluencer);
        const instagramName = req.params.instagramName;
        const filter = Number(req.params.filter);
        const idSquad = Number(req.params.idSquad);
        const status = Number(req.params.status);
        const product = Number(req.params.product);
        const user = Number(req.params.idUser);

        try {

            const prospectionList = await prospectionService.getAllProspection(initialDate, finalDate, typeInfluencer, instagramName, product, idUser, idSquad, status, user, filter);
            return res.json(prospectionList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getAllStatus(req: Request, res: Response): Promise<Response> {

        try {

            const statusList = await prospectionService.getStatus();
            return res.json(statusList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getAllSquad(req: Request, res: Response): Promise<Response> {

        const idUser = req.idUser;

        try {

            const squadList = await prospectionService.getUserSquad(idUser);
            return res.json(squadList);
            
        } catch (error) {
            if(error instanceof SquadError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }
    
    async getAllAgeGroup(req: Request, res: Response): Promise<Response> {

        try {

            const ageList = await prospectionService.getAgeGroup();
            return res.json(ageList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getAllLocation(req: Request, res: Response): Promise<Response> {

        try {

            const locationList = await prospectionService.getLocations();
            return res.json(locationList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getAllExclusivity(req: Request, res: Response): Promise<Response> {

        try {

            const exclusivityList = await prospectionService.getExclusivity();
            return res.json(exclusivityList);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getMapping(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;

        try {

            const mapping = await prospectionService.getMapping(Number(idProspection));

            return res.json(mapping);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getFirstContact(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;

        try {

            const status = await prospectionService.getActualStatus(Number(idProspection));
            const firstContact = await prospectionService.getFirstContact(Number(idProspection), status);

            return res.json(firstContact);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getNegotiation(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;

        try {

            const status = await prospectionService.getActualStatus(Number(idProspection));
            const negotiation = await prospectionService.getNegotiation(Number(idProspection), status);

            return res.json(negotiation);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getDetailsInformations(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;
        const idUser = req.idUser;

        try {

            const status = await prospectionService.getActualStatus(Number(idProspection));
            const dataInformation = await prospectionService.getInformationBeforeAprovation(Number(idProspection), status, idUser);

            const resultInformation = {
                status: status,
                dataInformation: dataInformation
            }

            return res.json(resultInformation);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getSetpStatus(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;

        try {

            const userResponsable = await prospectionService.getResponsable(Number(idProspection));
            const stepStatus = await prospectionService.getStepStatus(Number(idProspection));

            const resultStep = {
                responsable: userResponsable,
                stepStatus: stepStatus
            };

            return res.json(resultStep);
            
        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getUserChanged(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection;

        try {

            const users = await prospectionService.getUserChanged(Number(idProspection));

            return res.json(users);
            
        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getLogChangedStatusProspection(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection

        try {

            const changedStatusProspection = await prospectionService.getLogChangedStatusProspection(Number(idProspection));

            return res.json(changedStatusProspection);
        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }
    
    async getUserProspection(req: Request, res: Response): Promise<Response> {

        try {

            const users = await prospectionService.getUserProspection();

            return res.json(users);
            
        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getNickNameInfluencer(req: Request, res: Response): Promise<Response> {

        const idProspection = req.params.idProspection

        try {

            const nickname = await prospectionService.getNickNameInfluencer(Number(idProspection))

            return res.json(nickname)

        }
        catch (error) {
            
            return res.status(400).json({error: 'Algo ocorreu, não foi possível realizer a ação!'})
        }
    }

}

export default ProspectionConroller;