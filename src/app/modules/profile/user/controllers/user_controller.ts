import { Request, Response } from "express";
import userValidation from "../shared/validations/user_validation";
import userService from "../shared/services/user_service";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";
import SequelizeConnect  from '../../../../../config/sequelize_request';
import emailController from "../../../email/controller/email_controller";
import authTokenService from "../../../auth/shared/services/auth_token_service";
const sequelize = SequelizeConnect.sequelizeConnect;

class UserController {

    // ******** POST ********

    async create(req: Request, res: Response): Promise<Response>{

        const transactionUser = await sequelize.transaction();
        const newUser = req.body;

        try {

            await userValidation.createValidation(req.body);
            await userService.createNewUser(newUser, transactionUser);
            await transactionUser.commit();

            return res.json(true);
            
        } catch (error) {
            
            await transactionUser.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async recoveryPassword(req: Request, res: Response): Promise<Response>{

        const transactionUser = await sequelize.transaction();
        const recoveryPassword = req.body;

        try {

            await userValidation.recoveryPasswordValidation(recoveryPassword);
            await emailController.sendEmail(recoveryPassword.email, authTokenService.generateTokenDigits(), 0);
            await transactionUser.commit();

            return res.json(true);
            
        } catch (error) {
            await transactionUser.rollback();
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    // ******** PUT ********

    async changePasswordProfile(req: Request, res: Response): Promise<Response>{

        const idUser = req.idUser;
        const userPassword = req.body;

        try {

            await userValidation.changePasswordUserValidation(userPassword);
            await userService.changePassword(userPassword, idUser);

            return res.json(true);
            
        } catch (error) {
            
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    // ******** GET ********

    async getAll(req: Request, res: Response): Promise<Response>{

        try {

            const userList = await userService.gellAllUsers();

            return res.json(userList);
            
        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação.'});
        }

    }

}

export default UserController;