import ProspectionError from "../../../../../shared/exceptions/prospection/prospection_exception";
import ProspectionDistraction from "../models/prospection_distraction";
import StatusDistractionProspection from "../models/status_distraction_prospection";
import prospectionDistractionRepository from "../../repository/prospection_distraction_repository";
import ProspectionWork from "../models/prospection_work";
import ProspectionDocumentation from "../models/prospection_documentation";
import authService from "../../../../auth/shared/services/auth_service";
import ProspectionDistractionFile from "../models/prospection_distraction_file";
import { Transaction } from "sequelize/types";
import ProcessProspection from "../models/process_prospection";
import ProspectionFinancial from "../models/prospection_financial";
import StatusStepProspection from "../models/status_step_prospection";
import Monitoring from "../../../monitoring/shared/models/monitoring";
import PublicationMonitoring from "../../../monitoring/shared/models/publication_monitoring";

class ProspectionService {

    async createDistraction(distraction: any, file: any){

        try {

            if(file) {
                var { filename: path } = file;
            }else{
                throw new ProspectionError('O relatório precisa ser enviado!');
            }
            
            if(distraction.typeOperation === '0'){
                if(await ProspectionDistraction.findOne({ where: { idProspection: distraction.idProspection }}))
                    throw new ProspectionError('Esse contrato já posssui um distrato existente!');

                await ProspectionDistraction.create({ 
                    urlMonitoring: path, commentMonitoring: distraction.comment, commentProspection: '', idStatusDistraction: 2, idProspection: distraction.idProspection 
                });
            }else{
                const distractorById = await ProspectionDistraction.findOne({ where: { idProspection: distraction.idProspection }});
                const typeProspection = await ProspectionWork.findOne({ where: { idProspection: distraction.idProspection }});

                if(typeProspection?.idType === 1 || typeProspection?.idType === 2){
                    const underAge = await ProspectionDocumentation.findOne({ where: { idProspection: distraction.idProspection }});
                    (underAge?.isUnderage) ? statusDistraction = 3 : statusDistraction = 5;
                }else{
                    var statusDistraction = 3;
                }

                await ProspectionDistraction.update({ 
                    commentProspection: distraction.comment, urlProspection: path,  idStatusDistraction: statusDistraction, idProspection: distraction.idProspection 
                }, { where: { id: distractorById?.id }});
            }

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async approvalDistraction(distraction: any){

        try {

            if(distraction.step === 4){
                await ProspectionDistraction.update({ idStatusDistraction: 4, commentReproved: distraction.comment }, { where: { id: distraction.idDistraction }});
            }else{
                await ProspectionDistraction.update({ idStatusDistraction: distraction.step }, { where: { id: distraction.idDistraction }});
            }
            return;

        } catch (error) {
            throw error;
        }

    }

    async updateMediaValue(payment: any){

        try {

            return await ProspectionWork.update({ mediaValue: payment.mediaValue }, { where: { idProspection: payment.idProspection }});

        } catch (error) {
            throw error;
        }

    }

    async uploadDistractionAndConfirmDistraction(file: any, distraction: any, transaction: Transaction){

        try {

            if(file) {
                var { filename: path } = file;
            }else{
                throw new ProspectionError('Você precisa anexar o arquivo do distrato!');
            }

            await ProspectionDistraction.update({ idStatusDistraction: 7 }, { where: { id: distraction.idDistraction }, transaction: transaction });
            await ProspectionDistractionFile.create({ url: path, idDistraction: distraction.idDistraction }, { transaction: transaction });
            await ProcessProspection.update({ distraction: true, idStatus: 6 }, { where: { idProspection: distraction.idProspection }, transaction: transaction });
            await StatusStepProspection.create({ idStatus: 6, idProspection: distraction.idProspection, obs: true, comments: "Contrato encerrado por distrato" }, { transaction: transaction });
            await Monitoring.update( { idStatus: 3 }, { where: { idProspection: distraction.idProspection }, transaction: transaction });
            const monitoring = await Monitoring.findOne({ where: { idProspection: distraction.idProspection }});
            await PublicationMonitoring.destroy({ where: { idMonitoring: monitoring?.id }});

            const financialProspection =  await ProspectionFinancial.findAll({ where: { idProspection: distraction.idProspection }});
            if(financialProspection.length > 0){
                for (const index in financialProspection) {
                    if(financialProspection[index].confirmPayment == null){
                        await ProspectionFinancial.update({ distraction: true }, { where: { id: financialProspection[index].id }, transaction: transaction });
                    }
                }
            }

        } catch (error) {
            throw error;
        }

    }

    async getAll(idUser: number){

        try {

            const isDirector: boolean = await authService.validateUserPolicy(idUser, 'influencer', 1);
            if(isDirector){
                return await prospectionDistractionRepository.getAll();
            }

            const isTeamLeader: boolean = await authService.validateUserPolicy(idUser, 'influencer', 2);
            if(isTeamLeader){
                return await prospectionDistractionRepository.getAllByTeamLeader(idUser);
            }

            const isUserInfluencer: boolean = await authService.validateUserPolicy(idUser, 'influencer', 0);
            if(isUserInfluencer){
                return await prospectionDistractionRepository.getAllByUser(idUser);
            }

            const isUserLegal: boolean = await authService.validateUserPolicy(idUser, 'legal', 0);
            if(isUserLegal){
                return await prospectionDistractionRepository.getAllByLegal();
            }

        } catch (error) {
            throw error;
        }

    }

    async getParcelPayment(idProspection: number){

        try {

            const parcelPayment = await ProspectionWork.findOne({ attributes : ['mediaValue'] , where: { idProspection: idProspection }});
            return parcelPayment?.mediaValue;

        } catch (error) {
            throw error;
        }

    }

}

export default new ProspectionService();