import TypeInfluencer from "../models/type_influencer";

class TypeInfluencerService {

    async getAll(){

        try {

            const typeList = TypeInfluencer.findAll({ attributes: ['id', 'name'], order: ['id'], raw: true});
            return typeList;

        } catch (error) {
            throw error;
        }

    }

}

export default new TypeInfluencerService();