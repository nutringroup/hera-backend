import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import AuthConfig  from '../../../../config/auth';
import authService from "../shared/services/auth_service";
import authValidation from "../shared/validations/auth_validation";
import AuthError from "../../../shared/exceptions/auth/auth_exception";
import SequelizeConnect  from '../../../../config/sequelize_request';
const sequelize = SequelizeConnect.sequelizeConnect;

class AuthUserAccessController {

    async getUserMenu(req: Request, res: Response): Promise<Response>{

        const idProfile: number = req.profile;
        const idOffice: number = req.idOffice;

        try {

            const userMenu = await authService.userMenuSetting(idProfile, idOffice);
            return res.json(userMenu);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação.'});
        }

    }

    // ******** VALIDATE FIRST ACCESS AND CHANGE USER STATUS  ********

    async validateTokenFirstAccess(req: Request, res: Response): Promise<Response>{

        const token: string = req.params.token;

        try {

            jwt.verify(token, AuthConfig.cod!, (err: any, decoded: any) => {
                if (err || !decoded) {
                    res.status(400).json({error:'O token utilizado já foi expirado.'});
                }
            });

            return res.json(true);
            
        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação.'});
        }

    }

    async createFirstAccess(req: Request, res: Response): Promise<Response>{

        let accessUser = req.body
        const transactionUser = await sequelize.transaction();

        try {

            await authValidation.userFirstAccessValidation(req.body);
            await authService.validateUserFirstAccess(accessUser, transactionUser);

            transactionUser.commit();

            return res.json(true);
            
        } catch (error) {
            transactionUser.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }



}

export default AuthUserAccessController;