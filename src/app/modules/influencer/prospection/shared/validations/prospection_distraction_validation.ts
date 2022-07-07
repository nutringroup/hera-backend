
import  * as Yup from 'yup';
import AuthError from "../../../../../shared/exceptions/auth/auth_exception";

class ProspectionDistractionValidation {

    async createDistractionValidation(data: any){

        try {

            const schema = Yup.object().shape({
                typeOperation: Yup.string().required(),
                idProspection: Yup.string().required(),
                comment: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async approvalDistractionValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idDistraction: Yup.string().required(),
                step: Yup.string().required(),
                comment: Yup.string(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async updateMediaValueValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                mediaValue: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async uploadDistractionValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idDistraction: Yup.string().required(),
                idProspection: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

}

export default new ProspectionDistractionValidation();