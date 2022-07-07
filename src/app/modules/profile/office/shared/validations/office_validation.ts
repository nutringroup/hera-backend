import  * as Yup from 'yup';
import AuthError from "../../../../../shared/exceptions/auth/auth_exception";
import Office from '../models/office';

class OfficeValidation {

    async createValidation(data: Office){

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

    async createOfficeSectorValidation(data: Office){

        try {

            const schema = Yup.object().shape({
                idOffice: Yup.string().required(),
                idSector: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async updateValidation(data: Office){

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

export default new OfficeValidation();