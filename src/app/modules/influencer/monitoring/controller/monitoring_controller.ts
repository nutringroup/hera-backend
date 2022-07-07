import { Request, Response } from "express";
import monitoringService from "../shared/services/monitoring_service";
import monitoringValidations from "../shared/validations/monitoring_validations";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";
import MonitoringError from "../../../../shared/exceptions/monitoring/monitoring_exception";
import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class MonitoringController {

    // ******** POST ********

    async createPublication(req: Request, res: Response): Promise<Response> {

        const idUser = req.idUser;
        const newPublication = req.body;
        const transaction = await sequelize.transaction();

        try {

            await monitoringValidations.createPublication(newPublication.publication);
            if(newPublication.publication.isLink) await monitoringValidations.createLinkPublication(newPublication.link)

            await monitoringService.createPublication(newPublication.publication, newPublication.link, idUser, transaction);
            await transaction.commit();
            return res.json(true);

        } catch (error) {
            await transaction.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async evaluationPublication(req: Request, res: Response): Promise<Response> {

        const publication = req.body;
        const transactionEvaluation = await sequelize.transaction();

        try {

            await monitoringValidations.evaluationPublication(publication);

            await monitoringService.evaluationPublication(publication, transactionEvaluation);
            await transactionEvaluation.commit();
            return res.json(true);

        } catch (error) {
            await transactionEvaluation.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async createMonitoringWording(req: Request, res: Response): Promise<Response> {

        const roadmapWording = req.body;
        const files = req.files;
        const transactionEvaluation = await sequelize.transaction();

        try {

            await monitoringValidations.createRoadmapWording(roadmapWording);

            await monitoringService.createRoadmapWording(roadmapWording, files, transactionEvaluation);
            await transactionEvaluation.commit();
            return res.json(true);

        } catch (error) {
            await transactionEvaluation.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async createMonitoringMaterial(req: Request, res: Response): Promise<Response> {

        const roadmapWording = req.body;
        const files = req.files;
        const transactionEvaluation = await sequelize.transaction();

        try {

            await monitoringValidations.createRoadmapWording(roadmapWording);

            await monitoringService.createRoadmapMaterial(roadmapWording, files, transactionEvaluation);
            await transactionEvaluation.commit();
            return res.json(true);

        } catch (error) {
            await transactionEvaluation.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    // ******** ROADMAP ********

    async createRoadmap(req: Request, res: Response): Promise<Response> {

        const roadMap = req.body;
        const file = req.file;
        const transactionEvaluation = await sequelize.transaction();

        try {

            await monitoringValidations.createRoadmap(roadMap);

            await monitoringService.createRoadmap(roadMap, file, transactionEvaluation);
            await transactionEvaluation.commit();
            return res.json(true);

        } catch (error) {
            await transactionEvaluation.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async createTokenRoadmap(req: Request, res: Response): Promise<Response> {

        const roadMap = req.body;
        const transactionRoadmap= await sequelize.transaction();

        try {

            await monitoringValidations.createRoadmapWording(roadMap);

            const token = await monitoringService.createTokenRoadmap(roadMap, transactionRoadmap);
            await transactionRoadmap.commit();
            return res.json(token);
            
        } catch (error) {
            await transactionRoadmap.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }
    
    // ******** PUT ********

    async selectUserNewMonitoring(req: Request, res: Response): Promise<Response> {

        const userMonitoring = req.body;
        const transactionProspetion = await sequelize.transaction();

        try {

            await monitoringValidations.selectUserMonitoring(userMonitoring);

            await monitoringService.selectNewUserMonitoring(userMonitoring, transactionProspetion);
            await transactionProspetion.commit();
            return res.json(true);

        } catch (error) {
            await transactionProspetion.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async updatePublication(req: Request, res: Response): Promise<Response> {

        const idUser = req.idUser;
        const publication = req.body;
        const transaction = await sequelize.transaction();

        try {

            await monitoringValidations.changePublication(publication);

            await monitoringService.updatePublication(publication, idUser, transaction);
            await transaction.commit();
            return res.json(true);

        } catch (error) {
            await transaction.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async approvalMaterial(req: Request, res: Response): Promise<Response> {

        const publication = req.body;
        const transaction = await sequelize.transaction();

        try {

            await monitoringValidations.approvalMaterialRoadmap(publication);

            await monitoringService.approvalMaterialRoadmap(publication, transaction);
            await transaction.commit();
            return res.json(true);

        } catch (error) {
            await transaction.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async approvalRoadmap(req: Request, res: Response): Promise<Response> {

        const publication = req.body;
        const transaction = await sequelize.transaction();

        try {

            await monitoringValidations.approvalMaterialRoadmap(publication);

            await monitoringService.approvalMaterialRoadmap(publication, transaction);
            await transaction.commit();
            return res.json(true);

        } catch (error) {
            await transaction.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async updateLinkTrakingPublication(req: Request, res: Response): Promise<Response> {

        const updateLink = req.body;
        const transaction = await sequelize.transaction();

        try {

            await monitoringValidations.updateLinkPublication(updateLink);

            await monitoringService.updateTrakingLink(updateLink, transaction);
            await transaction.commit();
            return res.json(true);

        } catch (error) {
            await transaction.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    // ******** GET ********
    
    async getAll(req: Request, res: Response): Promise<Response> {

        const idUser = req.idUser;
        const idSquad = req.params.idSquad;

        try {

            const listMonitoring = await monitoringService.getAllMonitoring(idUser, Number(idSquad));
            return res.json(listMonitoring);

        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async getAllPublicationByMonitoring(req: Request, res: Response): Promise<Response> {

        const idUser = req.idUser;
        const idMonitoring = req.params.idMonitoring;

        try {

            const listPublication = await monitoringService.getAllPublicationMonitoringByMonitoring(idUser, Number(idMonitoring));
            return res.json(listPublication);

        } catch (error) {
            if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async getAllPublicationByUser(req: Request, res: Response): Promise<Response> {

        const idUser = req.idUser;
        const idUserMonitoring = req.params.idUserMonitoring;

        try {

            const listPublication = await monitoringService.getAllPublicationMonitoringByUser(idUser, Number(idUserMonitoring));
            return res.json(listPublication);

        } catch (error) {
            if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async getAllPublicationBySquad(req: Request, res: Response): Promise<Response> {

        const idSquad = req.params.idSquad;

        try {

            const listPublication = await monitoringService.getAllPublicationMonitoringBySquad(Number(idSquad));
            return res.json(listPublication);

        } catch (error) {
            if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async getAllPublication(req: Request, res: Response): Promise<Response> {

        try {

            const listPublication = await monitoringService.getAllPublicationMonitoring();
            return res.json(listPublication);

        } catch (error) {
            if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async getAllRoadmapByUser(req: Request, res: Response): Promise<Response> {

        const idMonitoring = req.params.idMonitoring;
        const status = req.params.status;

        try {

            const listRoadmap= await monitoringService.getAllRoadmapByUser(Number(idMonitoring), Number(status));
            return res.json(listRoadmap);

        } catch (error) {
            if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async getAllRoadmapByWording(req: Request, res: Response): Promise<Response> {

        const status = req.params.status;

        try {

            const listRoadmap = await monitoringService.getAllRoadmapByWording(Number(status));
            return res.json(listRoadmap);

        } catch (error) {
            if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async getAllRoadmapWordingFilesByRoadmap(req: Request, res: Response): Promise<Response> {

        const idRoadmap = req.params.idRoadmap;

        try {

            const listFiles = await monitoringService.getAllRoadmapByWordingFiles(Number(idRoadmap));
            return res.json(listFiles);

        } catch (error) {
            if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async validateTokenRoadmap(req: Request, res: Response): Promise<Response> {

        const token = req.params.token;

        try {

            const idRoadmap = await monitoringService.validateTokenRoadmap(token);
            return res.json({ idRoadmap: idRoadmap });

        } catch (error) {
            if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async getAllRoadmapMaterialByRoadmap(req: Request, res: Response): Promise<Response> {

        const idRoadmap = req.params.idRoadmap;

        try {

            const listFiles = await monitoringService.getAllRoadmapByMaterialFiles(Number(idRoadmap));
            return res.json(listFiles);

        } catch (error) {
            if(error instanceof MonitoringError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

}

export default MonitoringController;