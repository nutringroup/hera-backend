
import  * as Yup from 'yup';
import AuthError from "../../../../../shared/exceptions/auth/auth_exception";

class SquadValidation {

    async createValidation(data: any){

        try {

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                idTeamLeaderProspection: Yup.string().required(),
                idTeamLeaderMonitoring: Yup.string().required(),
                prospection: Yup.array().of(Yup.string()),
                monitoring: Yup.array().of(Yup.string()),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async userSquadValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idUser: Yup.string().required(),
                idSquad: Yup.string().required(),
                type: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async changeTeamLeaderValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idUser: Yup.string().required(),
                type: Yup.string().required(),
                idSquad: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async changeNameValidation(data: any){

        try {

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                idSquad: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

}

export default new SquadValidation();