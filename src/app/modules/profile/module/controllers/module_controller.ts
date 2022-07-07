import { Request, Response } from "express";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";
import moduleRepository from "../repository/module_repository";
import Module from "../shared/models/module";
import moduleService from "../shared/services/module_service";
import moduleValidation from "../shared/validations/module_validation";

class ModuleController {

    // ******** POST ********

    async create(req: Request, res: Response): Promise<any>{

        const module: Module = req.body;

        try {

            await moduleValidation.createValidation(req.body);
            await moduleService.createNewModule(module);

            return res.json(true);
            
        } catch (error) {
            
            if(error instanceof AuthError)
                return res.status(400).json({error: error.message});
            else
                return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});
        }

    }

    // ******** GET ********

    async getAll(req: Request, res: Response): Promise<any>{

        try {

            const moduleList = await Module.findAll({ attributes: ['id', 'name'] , order: [['name', 'ASC']] });
            return res.json(moduleList);

        } catch (error) {
            
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});    
        }

    }
    
    async getPagesByIdModule(req: Request, res: Response): Promise<any>{

        const idModule = Number(req.params.id);

        try {

            const pagesList = await moduleRepository.pagesByIdModule(idModule);
            return res.json(pagesList);

        } catch (error) {
            return res.status(400).json({error:'Algo ocorreu, não foi possível realizar a ação!'});    
        }

    }

}

export default ModuleController;