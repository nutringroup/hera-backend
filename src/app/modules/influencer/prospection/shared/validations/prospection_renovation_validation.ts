
import  * as Yup from 'yup';
import AuthError from "../../../../../shared/exceptions/auth/auth_exception";

class ProspectionRenovationValidation {

    async createRenovationValidation(data: any){

        try {

            const schema = Yup.object().shape({
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

    async approvalRenovationValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idRenovation: Yup.string().required(),
                step: Yup.string().required(),
                comment: Yup.string()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

}

export default new ProspectionRenovationValidation();