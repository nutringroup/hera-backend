import  * as Yup from 'yup';
import AuthError from "../../../../shared/exceptions/auth/auth_exception";

class AuthValidation {

    async loginValidation(data: any){

        try {

            const schema = Yup.object().shape({
                email: Yup.string().email().required(),
                password: Yup.string().required().min(6),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async tokenValidation(data: any){

        try {

            const schema = Yup.object().shape({
                email: Yup.string().email().required(),
                cod: Yup.string().required().min(4),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async userFirstAccessValidation(data: any){

        try {

            const schema = Yup.object().shape({
                cod: Yup.string().required(),
                token: Yup.string().required(),
                password: Yup.string().min(6).required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

}

export default new AuthValidation();