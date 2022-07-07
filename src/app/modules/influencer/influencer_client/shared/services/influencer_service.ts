import SquadInfluencerError from "../../../../../shared/exceptions/squad/squad_influencer_exception";
import authRepository from "../../../../auth/repository/auth_repository";
import authService from "../../../../auth/shared/services/auth_service";
import Product from "../../../product/shared/models/product";
import productService from "../../../product/shared/services/product_service";
import influencerRepository from "../../repository/influencer_repository";
import Influencer from "../models/influencer";
import Segment from "../models/segment";
import TrackFollowers from "../models/track_followers";

class InfluencerService {

    async createNewInfluencer(newInfluencer: any, idUser: number){

        try {

            const influencer = await Influencer.findOne({ where: { instagramName: newInfluencer.instagramName }});
            if(influencer)
                throw new SquadInfluencerError("Conta de influenciador já está cadastrada!");

            await Influencer.create({ 
                name: newInfluencer.name, instagramName: newInfluencer.instagramName, idTrackFollowers: newInfluencer.idTrackFollowers, idSegment: newInfluencer.idSegment, 
                idSegmentSecondary: newInfluencer.idSegmentSecondary, idUser: idUser
            });
            return;
            
        } catch (error) {
            throw error;
        }

    }

    async getAllInfluencers(){

        try {

            const influencerList = await Influencer.findAll({
                attributes: ['id', 'name', 'instagramName'],
                include: [
                    {
                        model: TrackFollowers,
                        as: 'trackFollowers',
                        attributes: ['id', 'description']
                    },
                    {
                        model: Segment,
                        as: 'segment',
                        attributes: ['id', 'name']
                    },
                    {
                        model: Segment,
                        as: 'segmentSecondary',
                        attributes: ['id', 'name']
                    }
                ],
                order: ['name']
                
            });

            return influencerList;
            
        } catch (error) {
            throw error;
        }

    }

    async getAllInfluencersAvailable(idUser: number, name?: string){

        try {

            const isDirectorOrTeamLeader: boolean = await authService.validateUserPolicy(idUser, 'influencer', 3);
            const isUserProspection = await authService.validateUserProspection(idUser);

            if(isDirectorOrTeamLeader || isUserProspection){
                if(!name){
                    var influencerList: any[] = await influencerRepository.influencersAvailable();
                }else{
                    var influencerList: any[] = await influencerRepository.influencersAvailableByName(name);
                }
                
                let influencerListFormated: any[] = [];

                for (const index in influencerList) {

                    var influencerAvailable = true;
                    
                    const processInfluencer: any[] = await influencerRepository.processProspectionInfluencer(influencerList[index].id);
                    if(processInfluencer.length > 0){

                        for (const index in processInfluencer) {
                            if(processInfluencer[index].status !== 6 && processInfluencer[index].status !== 5 ){
                                influencerAvailable = false;
                                break;
                            }
                        }
                    }else{
                        influencerAvailable = true;
                    }

                    influencerListFormated.push({
                        id: influencerList[index].id,
                        name: influencerList[index].name,
                        instagramName: influencerList[index].instagramName,
                        available: influencerAvailable,
                        segment: {
                            id: influencerList[index].idSegment,
                            name: influencerList[index].nameSegment
                        },
                        segmentSecondary: {
                            id: influencerList[index].idSegmentSecondary,
                            name: influencerList[index].nameSegmentSecondary
                        },
                        trackFollowers: {
                            id: influencerList[index].idTrackFollowers,
                            description: influencerList[index].descriptionTrackFollowers
                        }

                    });
                }

                return {
                    isDirector: isDirectorOrTeamLeader,
                    permission: true,
                    influencerList: influencerListFormated
                };
            }else{
                return {
                    isDirector: false,
                    permission: false,
                    influencerList: []
                };
            }

            
        } catch (error) {
            throw error;
        }

    }

    async allProducts(){

        try {

            const productsInfluencer = await Product.findAll({ attributes: ['id', 'name'], where: { status: 1 }, order: ['name'] });
            return productsInfluencer;
            
        } catch (error) {
            throw error;
        }

    }

    async allProductsUsedByInfluencer(idInfluencer: number, idProspection: number){

        try {

            if(idProspection === 0){
                var productsInfluencer = await influencerRepository.productsUsedByInfluencer(idInfluencer);
            }else{
                var productsInfluencer = await influencerRepository.productsUsedByInfluencerProspection(idInfluencer, idProspection);
            }
            
            return productsInfluencer;
            
        } catch (error) {
            throw error;
        }

    }

    async allUserAndStatusUsedByInfluencer(idInfluencer: number){

        try {

            var listUserInfluencerFormated: any[] = [];
            const userInfluencer: any[] = await influencerRepository.userAndStatusUsedProspection(idInfluencer);
            if(userInfluencer.length > 0){
                for (const index in userInfluencer) {
                    var products = await influencerRepository.productsByProspection(userInfluencer[index].idProspection);
                    listUserInfluencerFormated.push({ name: userInfluencer[index].name, status: userInfluencer[index].status, products: products });
                }   
            }

            return listUserInfluencerFormated;
            
        } catch (error) {
            throw error;
        }

    }

    async allProductsAvaiableByInfluencer(idInfluencer: number){

        try {

            let productList = await productService.getAll();
            const productsInfluencer: any[] = await influencerRepository.productsUsedByInfluencer(idInfluencer);

            if(productsInfluencer.length > 0){
                for (const index in productsInfluencer) {
                    for (const index2 in productList) {
                        if(productList[index2].id === productsInfluencer[index].id){
                            productList.splice(Number(index2), 1);
                            break;
                        }
                    }
                }
            }

            return productList;
            
        } catch (error) {
            throw error;
        }

    }

    async validateProductsInInfluencer(idProduct: number, listProduct: number[], products: any[]){

        try {

            if(idProduct > 0){
                for (let index = 0; index < products.length; index++) {
                    if(idProduct === products[index].id){
                        throw new SquadInfluencerError();
                    }
                }   
            }else{
                for (const indexProd in listProduct) {
                    for (let index = 0; index < products.length; index++) {
                        if(listProduct[indexProd] === products[index].id){
                            throw new SquadInfluencerError();
                        }
                    }   
                }
            }

            return true;
            
        } catch (error) {
            throw error;
        }

    }

    async getAllCreatedByUser(idUser: number){

        try {

            const isUserProspection = await authService.validateUserProspection(idUser);
            if(!isUserProspection){
                return {
                    permission: false,
                    influencerList: []
                };
            }else{
                const influencerList = await Influencer.findAll({ attributes: ['id', 'name', 'instagramName'], where: { idUser: idUser }, order: ['name']});
        
                return {
                    permission: true,
                    influencerList: influencerList
                };
            }
            
        } catch (error) {
            throw error;
        }

    }

    async getDetailByUser(idInfluencer: number){

        try {

            const influencerList = await influencerRepository.detailProspectionByInfluencer(idInfluencer);
            
            return influencerList;
            
        } catch (error) {
            throw error;
        }

    }

}

export default new InfluencerService();