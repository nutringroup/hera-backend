import AuthError from "../../../../../shared/exceptions/auth/auth_exception";
import Module from "../models/module";

class ModuleService {

    async createNewModule(module: Module) {

        try {
            
            const newModule = await Module.findOne({ where: { name: module.name.toLowerCase() } });
            if(newModule){
                throw new AuthError('Nome do módulo já existente');
            }

            await Module.create({ name: module.name.toLowerCase() });

            return;

        } catch (error) {
            throw error;
        }

    }

}

export default new ModuleService();