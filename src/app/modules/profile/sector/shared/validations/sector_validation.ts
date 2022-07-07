import  * as Yup from 'yup';
import AuthError from "../../../../../shared/exceptions/auth/auth_exception";

class SectorValidation {

    async createValidation(data: any){

        try {

            const schema = Yup.object().shape({
                name: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async updateValidation(data: any){

        try {

            const schema = Yup.object().shape({
                id: Yup.string().required(),
                name: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

}

export default new SectorValidation();