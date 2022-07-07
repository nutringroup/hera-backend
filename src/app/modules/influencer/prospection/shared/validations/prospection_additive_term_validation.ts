import  * as Yup from 'yup';
import AuthError from "../../../../../shared/exceptions/auth/auth_exception";

class ProspectionAdditiveTermValidation {

    async createAdditiveTermValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                idReasonAdditiveTerm: Yup.string().required(),
                description: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async validateAdditiveTermValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idAdditiveTerm: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async validateLegalAdditiveTermValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idAdditiveTerm: Yup.string().required(),
                step: Yup.string().required(),
                observation: Yup.string()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async uploadAdditiveTermValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idAdditiveTerm: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async updateInstagramNameInfluencer(data: any){

        try {

            const schema = Yup.object().shape({
                idInfluencer: Yup.string().required(),
                instagramName: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

}

export default new ProspectionAdditiveTermValidation();