import { Transaction } from "sequelize/types";
import AuthError from "../../../../../shared/exceptions/auth/auth_exception";
import SquadError from "../../../../../shared/exceptions/squad/squad_exception";
import authService from "../../../../auth/shared/services/auth_service";
import Product from "../../../product/shared/models/product";
import TypeInfluencer from "../../../type_influencer/shared/models/type_influencer";
import squadRepository from "../../repository/squad_repository";
import Squad from "../models/squad";
import SquadMonitoring from "../models/squad_monitoring";
import SquadProspection from "../models/squad_prospection";

class SquadService {

    async createNewSquad(newSquad: any, transactionSquad: Transaction){

        try {

           const squads = await Squad.findOne({ where: { name: newSquad.name.toLowerCase().trim() }});
            if(squads)
                throw new AuthError('Nome de squad já existente');

            const squadCreated = await Squad.create({ name: newSquad.name.toLowerCase().trim(), status: 1, idTeamLeader: newSquad.idTeamLeaderProspection, idTeamLeaderMonitoring: newSquad.idTeamLeaderMonitoring }, { transaction: transactionSquad });

            for (const element of newSquad.prospection) {
                await SquadProspection.create({ idSquad: squadCreated.id, idUserProspection: Number(element) }, { transaction: transactionSquad });
            }

            for (const element of newSquad.monitoring) {
                await SquadMonitoring.create({ idSquad: squadCreated.id, idUserMonitoring: Number(element) }, { transaction: transactionSquad });
            }

           return;
            
        } catch (error) {
            throw error;
        }

    }

    async createUserSquad(squad: any){

        // type -> 1 - user prosp / 2 - user monit

        try {

            if(squad.type === 1){
                await SquadProspection.create({ idSquad: squad.idSquad, idUserProspection: squad.idUser });
            }else if (squad.type === 2){
                await SquadMonitoring.create({ idSquad: squad.idSquad, idUserMonitoring: squad.idUser });
            }
           
            return;

        } catch (error) {
            throw error;
        }

    }

    async changeTeamLeaderSquad(squad: any){

        try {

            const squadChange = await Squad.findOne({ attributes: ['id', 'idTeamLeader', 'idTeamLeaderMonitoring'], where: { id: squad.idSquad }});
            if(squad.type === 0){
                if(squadChange?.id){
                    if(squad.idUser === squadChange.idTeamLeader) throw new SquadError("Você está tentando alterar usuários iguais!");
                }else{
                    throw new SquadError("Squad não encontrado para a troca do Team Leader!");
                }
                
                const idUser = await authService.validateUserPolicy(squad.idUser, 'influencer', 2);
                if(!idUser) throw new SquadError("Usúario enviado não é um Team Leader de influencer!");

                await Squad.update({ idTeamLeader: squad.idUser }, { where: { id: squad.idSquad }});
            }else if(squad.type === 1){
                if(squadChange?.id){
                    if(squad.idUser === squadChange.idTeamLeaderMonitoring) throw new SquadError("Você está tentando alterar usuários iguais!");
                }else{
                    throw new SquadError("Squad não encontrado para a troca do Team Leader!");
                }
                
                const idUser = await authService.validateUserPolicy(squad.idUser, 'influencer', 2);
                if(!idUser) throw new SquadError("Usúario enviado não é um Team Leader de influencer!");

                await Squad.update({ idTeamLeaderMonitoring: squad.idUser }, { where: { id: squad.idSquad }});
            }else{
                throw new SquadError("Squad não encontrou o team leader para realizar a troca!");   
            }

            return;

        } catch (error) {
            throw error;
        }

    }

    async changeNameSquad(squad: any){

        try {

            await Squad.update({ name: squad.name }, { where: { id: squad.idSquad }});

            return;

        } catch (error) {
            throw error;
        }

    }

    async validateUserExistSquad(squad: any){

        try {

            const teamLeaderProsp = await Squad.findOne({ where: { id: squad.idSquad, idTeamLeader: squad.idUser }});
            if(teamLeaderProsp)
                throw new SquadError("O usuário que está tentando criar já está cadastrado como team leader de prospecção!");

            const teamLeaderMonit = await Squad.findOne({ where: { id: squad.idSquad, idTeamLeaderMonitoring: squad.idUser }});
            if(teamLeaderMonit)
                throw new SquadError("O usuário que está tentando criar já está cadastrado como team leader de monitoramento!");

            const userprosp = await SquadProspection.findOne({ where: { idSquad: squad.idSquad, idUserProspection: squad.idUser }});
            if(userprosp)
                throw new SquadError("O usuário que está tentando criar já está cadastrado no time de prospecção!");

            const usersMonitoring = await SquadMonitoring.findOne({ where: { idSquad: squad.idSquad, idUserMonitoring: squad.idUser }});
            if(usersMonitoring)
                throw new SquadError("O usuário que está tentando criar já está cadastrado no time de monitoramento!");
            
        } catch (error) {
            throw error;
        }

    }

    async deleteUserSquad(idSquad: number, idUser: number){

        try {

            const userprosp = await SquadProspection.findOne({ where: { idSquad: idSquad, idUserProspection: idUser }});
            if(userprosp){
                const userActualProsp = await squadRepository.usersActualSquad(idSquad, idUser);
                if(userActualProsp.length > 0){
                    // verify if user have some prospection in open - importante
                    throw new SquadError("O usuário possui uma prospecção em aberta. Para excluir o usuário, passe as prospecções dele para um outro usuário de prospecção!");
                }else{
                    await SquadProspection.destroy({ where: { idSquad: idSquad, idUserProspection: idUser }});
                    return;
                }
            }

            const usersMonitoring = await SquadMonitoring.findOne({ where: { idSquad: idSquad, idUserMonitoring: idUser }});
            if(usersMonitoring) {
                await SquadMonitoring.destroy({ where: { idSquad: idSquad, idUserMonitoring: idUser }});
                return;
            }

            throw new SquadError("O usuário não está no time de prospecção e nem monitoramento!");

        } catch (error) {
            throw error;
        }

    }
    
    async getAllSquads(){

        try {

           const squads = await Squad.findAll({ attributes: ['id', 'name'], raw: true });
           return squads;
            
        } catch (error) {
            throw error;
        }

    }

    async getAllSquadsByUser(idUser: number){

        try {

           const squads = await squadRepository.squadsByUser(idUser);
           return squads;
            
        } catch (error) {
            throw error;
        }

    }

    async usersAvaiable(){

        try {

           const users = await squadRepository.usersAvailable();
           return users;
            
        } catch (error) {
            throw error;
        }

    }

    async getAllProducts(){

        try {

           const productList = await Product.findAll({ attributes: ['id', 'name'], where: { status: 1 }, order: ['name'] });
           return productList;
            
        } catch (error) {
            throw error;
        }

    }

    async getAllTypesInfluencer(){

        try {

           const typetList = await TypeInfluencer.findAll({ attributes: ['id', 'name'], order: ['id'] });
           return typetList;
            
        } catch (error) {
            throw error;
        }

    }

    async getDetailAllSquad(idSquad: number){

        try {

            const squad = await Squad.findOne({ attributes: ['id', 'name'] ,where: { id: idSquad }, raw: true});
            if(!squad){
                throw new SquadError('Não foi possível buscar o squad!');
            }

            const teamLeaderProspection = await squadRepository.teamLeaderSquad(idSquad, 0);
            const usersProspection = await squadRepository.usersProspectionSquad(idSquad);
            const teamLeaderMonitoring = await squadRepository.teamLeaderSquad(idSquad, 1);
            const usersMonitoring = await squadRepository.usersMonitoringSquad(idSquad);

            const returnDetailSquad = {
                id: squad.id, name: squad.name,
                teamLeaderProspection: teamLeaderProspection,
                usersProspection: usersProspection,
                teamLeaderMonitoring: teamLeaderMonitoring,
                usersMonitoring: usersMonitoring
            };

           return returnDetailSquad;
            
        } catch (error) {
            throw error;
        }

    }

    async getTeamLeaders(idSquad: number){

        try {

            const squad = await Squad.findOne({ attributes: ['id', 'name'] ,where: { id: idSquad }, raw: true});
            if(!squad){
                throw new SquadError('Não foi possível buscar o squad!');
            }

            const teamLeaderProspection = await squadRepository.teamLeaderSquad(idSquad, 0);
            const teamLeaderMonitoring = await squadRepository.teamLeaderSquad(idSquad, 1);

            const returnTeamLeaders = {
                teamLeaderProspection: teamLeaderProspection,
                teamLeaderMonitoring: teamLeaderMonitoring,
            };

           return returnTeamLeaders;
            
        } catch (error) {
            throw error;
        }

    }

    async getUsersBySquad(idSquad: number, type: number){

       // type 1 - prospetion / 2 - monitoring

        try {

            if(type === 1){
                const usersList = await squadRepository.usersProspectionSquad(idSquad);
                return usersList;
            }else{
                const usersList = await squadRepository.usersMonitoringSquad(idSquad);
                return usersList;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async getUsersTeamLeader(idSquad?: number){

        try {

            if(idSquad)
                var usersList = await squadRepository.usersTeamLeaderByIdSquad(idSquad);
            else
                var usersList = await squadRepository.usersTeamLeader();
           
           return usersList;
            
        } catch (error) {
            throw error;
        }

    }

}

export default new SquadService();