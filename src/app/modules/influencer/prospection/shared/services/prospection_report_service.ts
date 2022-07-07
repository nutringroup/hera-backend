import prospectionReportRepository from "../../repository/prospection_report_repository";
import authService from "../../../../auth/shared/services/auth_service";
import ProspectionError from "../../../../../shared/exceptions/prospection/prospection_exception";

class ProspectionReportService {

    async getProspectionReport(initialDate: string, finalDate: string, typeInfluencer: number[], segment: number[], product: number[], idUser: number, userFilter: number[]){

        try {

            if(initialDate === '0000-00-00' && finalDate === '0000-00-00' && typeInfluencer.length === 0 && segment.length === 0 && product.length === 0 && userFilter.length === 0 )
                throw new ProspectionError("Selecione ao menos um campo para extrair os dados do relatório");
            
                const isDirectorOrTeamLeader: boolean = await authService.validateUserPolicy(idUser, 'influencer', 3);
                if(isDirectorOrTeamLeader){
                    var prospectioMapped: any = await prospectionReportRepository.getAllMappedProspection(this.createDynamicQueryFilter(initialDate, finalDate, typeInfluencer, segment, product, userFilter), 0); 
                    var prospectioSigned: any = await prospectionReportRepository.getAllSignedProspection(this.createDynamicQueryFilter(initialDate, finalDate, typeInfluencer, segment, product, userFilter), 0); 
                    var prospectioValueSigned: any = await prospectionReportRepository.getAllValueSignedProspection(this.createDynamicQueryFilter(initialDate, finalDate, typeInfluencer, segment, product, userFilter), 0); 
                    var prospectioMediaValueSigned: any = await prospectionReportRepository.getAllMediaValueSignedProspection(this.createDynamicQueryFilter(initialDate, finalDate, typeInfluencer, segment, product, userFilter), 0); 
                }else{
                    var prospectioMapped: any = await prospectionReportRepository.getAllMappedProspection(this.createDynamicQueryFilter(initialDate, finalDate, typeInfluencer, segment, product, userFilter), idUser); 
                    var prospectioSigned: any = await prospectionReportRepository.getAllSignedProspection(this.createDynamicQueryFilter(initialDate, finalDate, typeInfluencer, segment, product, userFilter), idUser); 
                    var prospectioValueSigned: any = await prospectionReportRepository.getAllValueSignedProspection(this.createDynamicQueryFilter(initialDate, finalDate, typeInfluencer, segment, product, userFilter), idUser); 
                    var prospectioMediaValueSigned: any = await prospectionReportRepository.getAllMediaValueSignedProspection(this.createDynamicQueryFilter(initialDate, finalDate, typeInfluencer, segment, product, userFilter), idUser);    
                }
                
                return {
                    totalMapped: prospectioMapped.total ?? 0,
                    totalSigned: prospectioSigned.total ?? 0,
                    totalValueSigned: prospectioValueSigned.total ?? 0,
                    totalMediaValueSigned: prospectioMediaValueSigned.total ?? 0,
                };
            

        } catch (error) {
            throw error;
        }

    }

    createDynamicQueryFilter(initialDate: string, finalDate: string, typeInfluencer: number[], segment: number[], product: number[], userFilter: number[]): string {

        var query: string = '';

        if(initialDate != '0000-00-00' || finalDate != '0000-00-00'){
            if(initialDate != '0000-00-00' && finalDate == '0000-00-00'){
                if(query.length == 0){
                    query = query + ` SUBSTRING(process_prospection_influencer.created_at, 1, 10) >= '${initialDate}'`;
                }else{
                    query = query + ` and SUBSTRING(process_prospection_influencer.created_at, 1, 10) >= '${initialDate}'`;
                }
            }else if(initialDate == '0000-00-00' && finalDate != '0000-00-00'){
                if(query.length == 0){
                    query = query + ` SUBSTRING(process_prospection_influencer.updated_at, 1, 10) <= '${finalDate}'`;
                }else{
                    query = query + ` and SUBSTRING(process_prospection_influencer.updated_at, 1, 10) <= '${finalDate}'`;
                }
            }else{
                if(query.length == 0){
                    query = query + ` (SUBSTRING(process_prospection_influencer.created_at, 1, 10) >= '${initialDate}' and SUBSTRING(process_prospection_influencer.updated_at, 1, 10) <= '${finalDate}' )`;
                }else{
                    query = query + ` and (SUBSTRING(process_prospection_influencer.created_at, 1, 10) >= '${initialDate}' and SUBSTRING(process_prospection_influencer.updated_at, 1, 10) <= '${finalDate}' )`;
                }
            }
        }

        if(typeInfluencer.length > 0){
            let influencerAttribute = '';
            for (const index in typeInfluencer) {
                (typeInfluencer.length == (Number(index) + 1)) ? influencerAttribute+= `${typeInfluencer[index]},` : influencerAttribute+= `${typeInfluencer[index]}`;
            }
            if(query.length == 0){
                query = query + ` prospection_work_influencer.id_type in(${typeInfluencer})`;
            }else{
                query = query + ` and prospection_work_influencer.id_type in(${typeInfluencer})`;
            }
        }

        if(product.length > 0){
            let productAttribute = '';
            for (const index in product) {
                (product.length == (Number(index) + 1)) ? productAttribute+= `${product[index]},` : productAttribute+= `${product[index]}`;
            }
            if(query.length == 0){
                query = query + ` product_prospection_influencer.id_product in(${product})`;
            }else{
                query = query + ` and product_prospection_influencer.id_product in(${product})`;
            }
        }

        if(segment.length > 0){
            let segmentAttribute = '';
            for (const index in segment) {
                (segment.length == (Number(index) + 1)) ? segmentAttribute+= `${segment[index]},` : segmentAttribute+= `${segment[index]}`;
            }
            if(query.length == 0){
                query = query + ` influencer.id_segment in(${segment})`;
            }else{
                query = query + ` and influencer.id_segment in(${segment})`;
            }
        }

        if(userFilter.length > 0){
            let userAttribute = '';
            for (const index in userFilter) {
                (userFilter.length == (Number(index) + 1)) ? userAttribute+= `${userFilter[index]},` : userAttribute+= `${userFilter[index]}`;
            }
            if(query.length == 0){
                query = query + ` prospection_user_actual_influencer.id_user in(${userFilter})`;
            }else{
                query = query + ` and prospection_user_actual_influencer.id_user in(${userFilter})`;
            }
        }

        return query;

    }

}

export default new ProspectionReportService();