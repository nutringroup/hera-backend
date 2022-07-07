
import  * as Yup from 'yup';
import AuthError from "../../../../../shared/exceptions/auth/auth_exception";

class MonitoringValidation {

    async selectUserMonitoring(data: any){

        try {

            const schema = Yup.object().shape({
                idMonitoring: Yup.string().required(),
                idUser: Yup.string().required(),
                idSquad: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async createPublication(data: any){

        try {

            const schema = Yup.object().shape({
                idMonitoring: Yup.string().required(),
                datePublication: Yup.string().required(),
                isStories: Yup.string().required(),
                isPhoto: Yup.string().required(),
                isVideo: Yup.string().required(),
                color: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async createLinkPublication(data: any){

        try {

            const schema = Yup.object().shape({
                url: Yup.string().required(),
                origin: Yup.string().required(),
                media: Yup.string().required(),
                content: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async updateLinkPublication(data: any){

        try {

            const schema = Yup.object().shape({
                idMonitoring:Yup.string().required(),
                idPublication: Yup.string().required(),
                url: Yup.string().required(),
                origin: Yup.string().required(),
                media: Yup.string().required(),
                content: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async changePublication(data: any){

        try {

            const schema = Yup.object().shape({
                idPublication: Yup.string().required(),
                datePublication: Yup.string().required(),
                status: Yup.string().required(),
                isStories: Yup.string().required(),
                isPhoto: Yup.string().required(),
                isVideo: Yup.string().required(),
                commentChange: Yup.string().required(),
                color: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async evaluationPublication(data: any){

        try {

            const schema = Yup.object().shape({
                idPublication: Yup.string().required(),
                idStatusEvaluation: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async createRoadmap(data: any){

        try {

            const schema = Yup.object().shape({
                idMonitoring: Yup.string().required(),
                description: Yup.string().required(),
                isRoadmap: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async createRoadmapWording(data: any){

        try {

            const schema = Yup.object().shape({
                idRoadmap: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async tokenRoadmap(data: any){

        try {

            const schema = Yup.object().shape({
                idRoadmap: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async approvalMaterialRoadmap(data: any){

        try {

            const schema = Yup.object().shape({
                idRoadmap: Yup.string().required(),
                step: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }
    
}

export default new MonitoringValidation();