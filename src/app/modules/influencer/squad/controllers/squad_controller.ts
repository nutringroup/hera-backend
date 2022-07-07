import { Request, Response } from "express";
import squadService from "../shared/services/squad_service";
import squadValidation from "../shared/validations/squad_validation";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";
import authService from "../../../auth/shared/services/auth_service";
import SquadError from "../../../../shared/exceptions/squad/squad_exception";

import SequelizeConnect  from '../../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class SquadController {

    // ******** POST ********

    async create(req: Request, res: Response): Promise<Response>{

        const transactionSquad = await sequelize.transaction();
        const squad = req.body;

        try {

            await squadValidation.createValidation(req.body);
            await squadService.createNewSquad(squad, transactionSquad);
            await transactionSquad.commit();

            return res.json(true);
            
        } catch (error) {
            
            await transactionSquad.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async createUserSquad(req: Request, res: Response): Promise<Response>{

        const squad = req.body;

        try {

            await squadValidation.userSquadValidation(req.body);
            
            await squadService.validateUserExistSquad(squad);
            await squadService.createUserSquad(squad);

            return res.json(true);
            
        } catch (error) {
            
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof SquadError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    // ******** PUT ********

    async changeNameSquad(req: Request, res: Response): Promise<Response>{

        const squad = req.body;

        try {

            await squadValidation.changeNameValidation(squad);
            
            await squadService.changeNameSquad(squad);
            return res.json(true);
            
        } catch (error) {
            
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof SquadError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }
    
    async changeTeamLeaderSquad(req: Request, res: Response): Promise<Response>{

        const squad = req.body;

        try {

            await squadValidation.changeTeamLeaderValidation(squad);
            
            await squadService.changeTeamLeaderSquad(squad);
            return res.json(true);
            
        } catch (error) {
            
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else if(error instanceof SquadError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    // ******** GET ********

    async getAll(req: Request, res: Response): Promise<Response>{

        const idUser = req.idUser;

        try {

            let userProspection, userMonitoring, teamLeaderProspection, teamLeaderMonitoring;
            let squadList: any[] = [];

            const useIsDirector: boolean = await authService.validateUserPolicy(idUser, 'influencer', 1);
            if(useIsDirector){
                squadList = await squadService.getAllSquads();
            }else{
                var squadListUser: any = await squadService.getAllSquadsByUser(idUser);

                if(squadListUser.length > 0){
                    for (const index in squadListUser) {
                        teamLeaderProspection = await authService.validateTypeTeamLeaderInfluencer(idUser, squadListUser[index].id, 1);
                        teamLeaderMonitoring = await authService.validateTypeTeamLeaderInfluencer(idUser, squadListUser[index].id, 2);
                        userProspection = await authService.validateTypeUserInfluencer(idUser, squadListUser[index].id, 1);
                        userMonitoring = await authService.validateTypeUserInfluencer(idUser, squadListUser[index].id, 2);

                        squadList.push({ 
                            id: squadListUser[index].id, 
                            name: squadListUser[index].name, 
                            teamLeaderProspection: teamLeaderProspection, 
                            teamLeaderMonitoring: teamLeaderMonitoring,
                            userProspection: userProspection,
                            userMonitoring: userMonitoring
                        });
                    }
                }
            }
            

            return res.json({
                isDirector: useIsDirector,
                squads: squadList
            });
            
        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getUsers(req: Request, res: Response): Promise<Response>{

        try {
            
            const users = await squadService.usersAvaiable();
            return res.json(users);

        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getProducts(req: Request, res: Response): Promise<Response>{

        try {
            
            const productList = await squadService.getAllProducts();
            return res.json(productList);

        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getTypesIfluencer(req: Request, res: Response): Promise<Response>{

        try {
            
            const typeList = await squadService.getAllTypesInfluencer();
            return res.json(typeList);

        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getDetail(req: Request, res: Response): Promise<Response>{

        const idSquad = req.params.idSquad;

        try {
            
            const squadDetail = await squadService.getDetailAllSquad(Number(idSquad));
            return res.json(squadDetail);

        } catch (error) {
            
            if(error instanceof SquadError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getTeamLeaders(req: Request, res: Response): Promise<Response>{

        const idSquad = req.params.idSquad;

        try {
            
            const squadDetail = await squadService.getTeamLeaders(Number(idSquad));
            return res.json(squadDetail);

        } catch (error) {
            
            if(error instanceof SquadError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getUsersProspectionBySquad(req: Request, res: Response): Promise<Response>{

        const idSquad = req.params.idSquad;

        try {
            
            const usersList = await squadService.getUsersBySquad(Number(idSquad), 1);
            return res.json(usersList);

        } catch (error) {
            if(error instanceof SquadError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getUsersMonitoringBySquad(req: Request, res: Response): Promise<Response>{

        const idSquad = req.params.idSquad;

        try {
            
            const usersList = await squadService.getUsersBySquad(Number(idSquad), 2);
            return res.json(usersList);

        } catch (error) {
            if(error instanceof SquadError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    async getUsersTeamLeader(req: Request, res: Response): Promise<Response>{

        const idSquad = req.params.idSquad;

        try {

            if(idSquad){
                var usersList = await squadService.getUsersTeamLeader(Number(idSquad));
            }else{
                var usersList = await squadService.getUsersTeamLeader();
            }
            
            return res.json(usersList);

        } catch (error) {
            if(error instanceof SquadError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    // ******** DELETE ********

    async deleteUserSquad(req: Request, res: Response): Promise<Response>{

        const idSquad = req.params.idSquad;
        const idUser = req.params.idUser;

        try {
            
            await squadService.deleteUserSquad(Number(idSquad), Number(idUser));
            return res.json(true);

        } catch (error) {
            
            if(error instanceof SquadError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

}

export default SquadController;