import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import  auth  from '../../config/auth';
import AuthController from '../modules/auth/controllers/auth_controller';


class MiddleWares {

    validatePolicy(routeAccess: string) {

        let idUser: number;
        let profile: number;
        let idOffice: number;
        const authController = new AuthController();

        return async function(req: Request, res: Response, next: NextFunction) {

            const bearerHeader = req.headers.authorization;

            if(typeof bearerHeader !== 'undefined'){
                const bearer = bearerHeader.split(' ');
                var token = bearer[1]; 
            }else{
                return res.status(401).json({ error: 'Sessão expirada. Faça o login novamente.'});
            }

            try{

                jwt.verify(token, auth.cod!, (err: any, decoded: any) => {
                    if (err || !decoded) {
                        const erro = {'id':401,'mensagem':'Sessão expirada. Por favor, faça o login novamente.'};
                        throw erro;
                    }else{
                        idUser = decoded.id;
                        profile = decoded.profile;
                        idOffice = decoded.idOffice;
                    }
                });

                const access = await authController.accessValidate(routeAccess, idUser);
                if(access){
                    req.idUser = idUser;
                    req.profile = profile;
                    req.idOffice = idOffice;
                    return next();
                }else{
                    return res.status(403).json({ error: 'Sem permissão para acessar a página.'});
                }
   

            }catch(err){
                return res.status(401).json({ error: 'Sessão expirada. Faça o login novamente.'});
            }
        }
    }

    validatePolicyBySector(routeAccess: string, sector: string, justDirector: boolean) {

        let idUser: number;
        let profile: number;
        let idOffice: number;
        const authController = new AuthController();

        return async function(req: Request, res: Response, next: NextFunction) {

            const bearerHeader = req.headers.authorization;

            if(typeof bearerHeader !== 'undefined'){
                const bearer = bearerHeader.split(' ');
                var token = bearer[1]; 
            }else{
                return res.status(401).json({ error: 'Sessão expirada. Faça o login novamente.'});
            }

            try{

                jwt.verify(token, auth.cod!, (err: any, decoded: any) => {
                    if (err || !decoded) {
                        const erro = {'id':401,'mensagem':'Sessão expirada. Por favor, faça o login novamente.'};
                        throw erro;
                    }else{
                        idUser = decoded.id;
                        profile = decoded.profile;
                        idOffice = decoded.idOffice;
                    }
                });

                const access = await authController.accessValidate(routeAccess, idUser);
                if(justDirector){
                    var accessDirector = await authController.validateUserPolicy(idUser, sector, 1);    
                }else{
                    var accessDirector = await authController.validateUserPolicy(idUser, sector, 3);   
                }

                if(access && accessDirector){
                    req.idUser = idUser;
                    req.profile = profile;
                    req.idOffice = idOffice;
                    return next();
                }else{
                    return res.status(403).json({ error: 'Sem permissão para acessar a página.'});
                }  
                

            }catch(err){
                return res.status(401).json({ error: 'Sessão expirada. Faça o login novamente.'});
            }
        }
    }

    validatePolicyInfluencer(routeAccess: string, justDirector: boolean) {

        let idUser: number;
        let profile: number;
        let idOffice: number;
        const authController = new AuthController();

        return async function(req: Request, res: Response, next: NextFunction) {

            const bearerHeader = req.headers.authorization;

            if(typeof bearerHeader !== 'undefined'){
                const bearer = bearerHeader.split(' ');
                var token = bearer[1]; 
            }else{
                return res.status(401).json({ error: 'Sessão expirada. Faça o login novamente.'});
            }

            try{

                jwt.verify(token, auth.cod!, (err: any, decoded: any) => {
                    if (err || !decoded) {
                        const erro = {'id':401,'mensagem':'Sessão expirada. Por favor, faça o login novamente.'};
                        throw erro;
                    }else{
                        idUser = decoded.id;
                        profile = decoded.profile;
                        idOffice = decoded.idOffice;
                    }
                });

                const access = await authController.accessValidate(routeAccess, idUser);
                if(justDirector){
                    var accessDirector = await authController.validateUserPolicy(idUser, 'influencer', 1);    
                }else{
                    var accessDirector = await authController.validateUserPolicy(idUser, 'influencer', 3);   
                }

                if(access && accessDirector){
                    req.idUser = idUser;
                    req.profile = profile;
                    req.idOffice = idOffice;
                    return next();
                }else{
                    return res.status(403).json({ error: 'Sem permissão para acessar a página.'});
                }  
                

            }catch(err){
                return res.status(401).json({ error: 'Sessão expirada. Faça o login novamente.'});
            }
        }
    }

    validatePolicyLegal(routeAccess: string, justDirector: boolean) {

        let idUser: number;
        let profile: number;
        let idOffice: number;
        const authController = new AuthController();

        return async function(req: Request, res: Response, next: NextFunction) {

            const bearerHeader = req.headers.authorization;

            if(typeof bearerHeader !== 'undefined'){
                const bearer = bearerHeader.split(' ');
                var token = bearer[1]; 
            }else{
                return res.status(401).json({ error: 'Sessão expirada. Faça o login novamente.'});
            }

            try{

                jwt.verify(token, auth.cod!, (err: any, decoded: any) => {
                    if (err || !decoded) {
                        const erro = {'id':401,'mensagem':'Sessão expirada. Por favor, faça o login novamente.'};
                        throw erro;
                    }else{
                        idUser = decoded.id;
                        profile = decoded.profile;
                        idOffice = decoded.idOffice;
                    }
                });

                const access = await authController.accessValidate(routeAccess, idUser);
                if(justDirector){
                    var accessDirector = await authController.validateUserPolicy(idUser, 'legal', 1);   
                }else{
                    var accessDirector = await authController.validateUserPolicy(idUser, '', 0); 
                }

                if(access && accessDirector){
                    req.idUser = idUser;
                    req.profile = profile;
                    req.idOffice = idOffice;
                    return next();
                }else{
                    return res.status(403).json({ error: 'Sem permissão para acessar a página.'});
                }  
                

            }catch(err){
                return res.status(401).json({ error: 'Sessão expirada. Faça o login novamente.'});
            }
        }
    }

    validateWithoutPolicy() {

        let idUser: number;
        let profile: number;
        let idOffice: number;
        return async function(req: Request, res: Response, next: NextFunction) {

            const bearerHeader = req.headers.authorization;

            if(typeof bearerHeader !== 'undefined'){
                const bearer = bearerHeader.split(' ');
                var token = bearer[1]; 
            }else{
                return res.status(401).json({ error: 'Sessão expirada. Faça o login novamente.'});
            }

            try{

                jwt.verify(token, auth.cod!, (err: any, decoded: any) => {
                    if (err || !decoded) {
                        const erro = {'id':401,'mensagem':'Sessão expirada. Por favor, faça o login novamente.'};
                        throw erro;
                    }else{
                        idUser = decoded.id;
                        profile = decoded.profile;
                        idOffice = decoded.idOffice;
                    }
                });

                req.idUser = idUser;
                req.profile = profile;
                req.idOffice = idOffice;
                return next();

            }catch(err){
                return res.status(401).json({ error: 'Sessão expirada. Faça o login novamente.'});
            }
        }
    }
}

export default new MiddleWares();