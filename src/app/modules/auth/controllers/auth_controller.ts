import { Request, Response } from "express";
import authRepository from "../repository/auth_repository";
import authValidation from "../shared/validations/auth_validation";
import authService from "../shared/services/auth_service";
import AuthError from "../../../shared/exceptions/auth/auth_exception";
import authTokenService from "../shared/services/auth_token_service";
import emailController from "../../email/controller/email_controller";


class AuthController {

    // validate user with module
    async accessValidate(routeAccess: string, idUser: number){
        try{
            const usuarioResult = await authRepository.accessValidateRoute(routeAccess, idUser);
            return usuarioResult;
        }catch(error){
            throw error;
        }
    }

    async validateAccessAndCreateTokenToLogin(req: Request, res: Response): Promise<Response>{

        const { email, password } = req.body;

        try{

            await authValidation.loginValidation(req.body);

            const userProfileValidate  = await authService.userProfileValidate(email, false, password);

            const token = authTokenService.createTokenJWT(userProfileValidate.user.id, 1);
            const cod = authTokenService.generateTokenDigits();
            await emailController.sendEmail(userProfileValidate.user.emailSend!, cod, 0);
            await authService.createOrDestroyTokenToLogin(userProfileValidate.user.id, true, cod, token);

            return res.json(true);

        }catch(error){
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async validateTokenAndLogin(req: Request, res: Response): Promise<Response>{

        const { email, cod } = req.body;

        try{

            await authValidation.tokenValidation(req.body);

            const token = await authService.validateTokenLogin(email, cod);
            authTokenService.validateToken(token);
            const userProfileValidate  = await authService.userProfileValidate(email, true);
            await authService.createOrDestroyTokenToLogin(userProfileValidate.user.id, false);
            const newToken = authTokenService.createTokenJWT(userProfileValidate.user.id, 0, userProfileValidate.useProfile.id, userProfileValidate.useProfile.idOffice);
            return res.json({ name: userProfileValidate.user.name, email: userProfileValidate.user.email, token: newToken, office: `${userProfileValidate.useProfile.office} - ${userProfileValidate.useProfile.sector}`});

        }catch(error){
            
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }
    }

    async validateUserPolicy(idUser: number, sector: string, typeUser: number){
        try{
            const usuarioResult = await authService.validateUserPolicy(idUser, sector, typeUser);
            return usuarioResult;
        }catch(error){
            throw error;
        }
    }

    async verifyUserSector(idUser: number) {

        try {
            const userSector = await authService.verifyUserSector(idUser)
            return userSector
        }
        catch(error) {
            throw error
        }
    }

}

export default AuthController;