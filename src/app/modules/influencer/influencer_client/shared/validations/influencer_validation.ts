
import  * as Yup from 'yup';
import AuthError from "../../../../../shared/exceptions/auth/auth_exception";

class InfluencerValidation {

    async createValidation(data: any){

        try {

            const schema = Yup.object().shape({
                instagramName: Yup.string().required(),
                idTrackFollowers: Yup.string().required(),
                idSegment: Yup.string().required(),
                idSegmentSecondary: Yup.string().required(),
            });
    
            if(!(await schema.isValid(data)))
                throw new AuthError;

            if(data.idSegment === data.idSegmentSecondary)
                throw new AuthError('Os segmentos não podem ser iguais');
            
        } catch (error) {
            throw error;
        }

    }

}

export default new InfluencerValidation();