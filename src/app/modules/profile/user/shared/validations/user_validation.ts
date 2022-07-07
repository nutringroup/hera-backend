import  * as Yup from 'yup';
import AuthError from "../../../../../shared/exceptions/auth/auth_exception";

class UserValidation {

    async createValidation(data: any){

        try {

            const schema = Yup.object().shape({
                name: Yup.string().required().min(4),
                email: Yup.string().required(),
                idOfficeSector: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async recoveryPasswordValidation(data: any){

        try {

            const schema = Yup.object().shape({
                email: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async changePasswordUserValidation(data: any){

        try {

            const schema = Yup.object().shape({
                password: Yup.string().required().min(6),
                newPassword: Yup.string().required().min(6),
            });

            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

}

export default new UserValidation();