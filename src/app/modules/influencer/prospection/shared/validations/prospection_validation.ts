
import  * as Yup from 'yup';
import AuthError from "../../../../../shared/exceptions/auth/auth_exception";

class ProspectionValidation {

    async createValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idInfluencer: Yup.string().required(),
                idSquad: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async firstContactValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                audience: Yup.string().required(),
                following: Yup.string().required(),
                public: Yup.string().required(),
                idLocation: Yup.string().required(),
                idAge: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async negotiationValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                initialDate: Yup.string().required(),
                finalDate: Yup.string().required(),
                contractPeriod: Yup.string().required(),
                value: Yup.string().required(),
                job: Yup.string().required(),
                comments: Yup.string(),
                additionalImageUse: Yup.string().required(),
                additionalPeriod: Yup.string(),
                additionalPeriodValue: Yup.string(),
                idProduct: Yup.array().of(Yup.string()),
                idType: Yup.string().required(),
                idExclusivity: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async requestApprovalValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }
    
    async validateApprovalValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                step: Yup.string().required(),
                comments: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async disapproveValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                comments: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async checklistValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                nickname: Yup.string().required(),
                fullName: Yup.string().required(),
                class: Yup.string().required(),
                fallowers: Yup.string().required(),
                advice: Yup.string().required(),
                coupon: Yup.string().required(),
                birthday: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async checklistAddressValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                city: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async checklistBankValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                percentage: Yup.string().required(),
                mainName: Yup.string().required(),
                cpfCnpj: Yup.string().required(),
                bank: Yup.string().required(),
                agency: Yup.string().required(),
                account: Yup.string().required(),
                receiptBank: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async checklistUpdateBankValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                percentage: Yup.string().required(),
                mainName: Yup.string().required(),
                cpfCnpj: Yup.string().required(),
                bank: Yup.string().required(),
                agency: Yup.string().required(),
                account: Yup.string().required(),
                receiptBank: Yup.string().required(),
                isNew: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async checklistSocialValidation(data: any){

        try {

            const schema = Yup.object().shape({
                bowlSend: Yup.string().required(),
                observation: Yup.string(),
                paidPartnership: Yup.string().required(),
                storie: Yup.string().required(),
                storieValue: Yup.string().required(),
                personalStoriePosted: Yup.string().required(),
                photo: Yup.string().required(),
                photoValue: Yup.string().required(),
                photoFeed: Yup.string().required(),
                photoFeedValue: Yup.string().required(),
                receivedPhotoDate: Yup.string(),
                postPhotoFeedDate: Yup.string(),
                postPhoto: Yup.string().required(),
                video: Yup.string().required(),
                videoValue: Yup.string().required(),
                videoFeed: Yup.string().required(),
                videoFeedValue: Yup.string().required(),
                videoDuration: Yup.string().required(),
                videoFormat: Yup.string().required(),
                videoUploadDate: Yup.string(),
                receivedVideoDate: Yup.string(),
                postVideo: Yup.string(),
                postVideoDate: Yup.string(),
                canPublishInPublicityDay: Yup.string().required(),
                tiktok: Yup.string().required(),
                tiktokValue: Yup.string().required(),
                tiktokFeed: Yup.string().required(),
                tiktokFeedValue: Yup.string().required(),
                igtv: Yup.string().required(),
                igtvValue: Yup.string().required(),
                igtvFeed: Yup.string().required(),
                igtvFeedValue: Yup.string().required(),
                live: Yup.string().required(),
                liveValue: Yup.string().required(),
                liveSave: Yup.string().required(),
                liveSaveValue: Yup.string().required(),
                youtube: Yup.string().required(),
                youtubeValue: Yup.string().required(),
                youtubeFeed: Yup.string().required(),
                youtubeFeedValue: Yup.string().required(),
                brandExclusive: Yup.string().required(),
                segmentExclusive: Yup.string().required(),
                allowBoost: Yup.string().required(),
                segmentExclusiveValue: Yup.string().required(),
                valueUseImage: Yup.string().required(),
                valueUseImageValue: Yup.string().required(),
                commentChecklist: Yup.string(),
                additionalImageUse: Yup.string().required(),
                idProspection: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async validateDocumentUserSimple(data: any){

        try {

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                rg: Yup.string().required(),
                cpf: Yup.string().required(),
                nacionality: Yup.string().required(),
                civilState: Yup.string().required(),
                job: Yup.string().required(),
                email: Yup.string().required(),
                typeDocument: Yup.string().required(),
                idProspection: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async validateDocumentUserCompany(data: any){

        try {

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                tel: Yup.string().required(),
                email: Yup.string().required(),
                typeDocument: Yup.string().required(),
                idProspection: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async validateDocumentUserUnderage(data: any){

        try {

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                rg: Yup.string().required(),
                cpf: Yup.string().required(),
                nacionality: Yup.string().required(),
                tel: Yup.string().required(),
                email: Yup.string().required(),
                typeDocument: Yup.string().required(),
                idProspection: Yup.string().required(),
            });
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async documentationCreateValidation(data: any){

        try {

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                rg: Yup.string().required(),
                cpf: Yup.string().required(),
                nacionality: Yup.string().required(),
                email: Yup.string().required(),
                isUnderage: Yup.string().required(),
                token: Yup.string().required(),
                idProspection: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async documentationUpdateValidation(data: any){

        try {

            const schema = Yup.object().shape({
                name: Yup.string().required(),
                rg: Yup.string().required(),
                cpf: Yup.string().required(),
                nacionality: Yup.string().required(),
                email: Yup.string().required(),
                isUnderage: Yup.string().required(),
                token: Yup.string().required(),
                isNew: Yup.string().required(),
                idDocumentation: Yup.string().required(),
                idProspection: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async documentationCreateInterveningValidation(data: any){

        try {

            const schema = Yup.object().shape({
                corporateName: Yup.string().required(),
                tel: Yup.string().required(),
                email: Yup.string().required(),
                token: Yup.string().required(),
                idProspection: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async documentationUpdateInterveningValidation(data: any){

        try {

            const schema = Yup.object().shape({
                corporateName: Yup.string().required(),
                tel: Yup.string().required(),
                email: Yup.string().required(),
                token: Yup.string().required(),
                isNew: Yup.string().required(),
                idDocumentation: Yup.string().required(),
                idProspection: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async   validateContract(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                isLegal: Yup.string().required(),
                observation: Yup.string(),
                annexType: Yup.string(),
                annexTypeObservation: Yup.string()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async validateNewContract(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                isLegal: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async financialValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                payments: Yup.array().of(Yup.string()),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async updateFinancialValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                payments: Yup.array().of(Yup.object().shape({
                    idPayment: Yup.string().required(),
                    datePayment: Yup.string().required()})),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async validateApprovalContractValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                step: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async changeUserProspectionValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idUser: Yup.string().required(),
                idUserToChange: Yup.string().required(),
                idSquad: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async changeStatusProspectionValidation(data: any){

        try {

            const schema = Yup.object().shape({
                idProspection: Yup.string().required(),
                idStatusAtual: Yup.string().required(),
                idStatusToChange: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async paymentRequest(data: any){

        try {

            const schema = Yup.object().shape({
                idPayment: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async confirmPayment(data: any){

        try {

            const schema = Yup.object().shape({
                idPaymentRequest: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async approvalPayment(data: any){

        try {

            const schema = Yup.object().shape({
                idPayment: Yup.string().required(),
                idPaymentRequest: Yup.string().required(),
                approval: Yup.string().required()
            });
    
            if(!(await schema.isValid(data))){
                throw new AuthError;
            }
            
        } catch (error) {
            throw error;
        }

    }

}

export default new ProspectionValidation();