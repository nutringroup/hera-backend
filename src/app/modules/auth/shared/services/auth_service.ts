import bcrypt from 'bcryptjs';
import { Transaction } from 'sequelize';
import authRepository from "../../repository/auth_repository";
import AuthError from "../../../../shared/exceptions/auth/auth_exception";
import { UserMenu } from "../../../profile/user/shared/models/interface/user_menu_attributes";
import User from '../../../profile/user/shared/models/user';
import UserConfirmEmail from '../../../profile/user/shared/models/user_confirm_email';
import UserTokenLogin from '../../../profile/user/shared/models/user_token_login';

class AuthService {

    async userProfileValidate(email: string, returnValidate: boolean, password?: string){

        try {

            const user = await User.findOne({ where:{ email: email }});

            if(!user){
                throw new AuthError("E-mail inválido!");
            }

            if(user.status != 1){   
                throw new AuthError("Seu usuário não está ativo no momento. Por favor entrar em contato com o suporte para mais informações.");
            }

            if(!returnValidate){
                if(!(await user.passwordVerify(password!))){
                    throw new AuthError("Senha inválida!");
                }
            }

            if(returnValidate){
                const useProfile: any = await authRepository.getUserProfile(email);
                return { user: user, useProfile: useProfile };
            }else{
                return { user: user };
            }

        } catch (error) {
            throw error;
        }
    }

    async createOrDestroyTokenToLogin(idUser: any, isCreate: boolean, cod?: string, token?: string){

        try {
            
            if(isCreate){
                await UserTokenLogin.destroy({ where: { idUser: idUser }});
                await UserTokenLogin.create({ idUser: idUser, cod: cod!, token: token! });
            }else{
                await UserTokenLogin.destroy({ where: { idUser: idUser }});
            }

        } catch (error) {
            throw error;
        }

        return;
    }

    async validateTokenLogin(email: string, cod: string): Promise<string> {

        try {

            const user = await User.findOne({ where: { email: email } });
            if(!user) throw new AuthError("Usuário não encontrado pelo email pela validação do token!");
            
            const userToken = await UserTokenLogin.findOne({ where: { idUser: user.id, cod: cod } });
            if(!userToken) throw new AuthError("Código de acesso inválido!");

            return userToken.token;

        } catch (error) {
            throw error;
        }

    }

    async userMenuSetting(idProfile: number, idOffice: number){

        let menuList: UserMenu[] = [];
        const userMenu: any = await authRepository.getUserMenu(idProfile);

        if(userMenu.length > 0){

            let idPaiList: any[] = [];

            // filtra o menu que tem idPai = 0 (os tópicos do menu) e depois varre esse array validando os seus filhos (submenus que estão agregados)

            idPaiList = userMenu.filter((data: any) => data.idPai === 0 && data.menu === 1);

            for(let i = 0;i < idPaiList.length;i++){
                var id = idPaiList[i].id;
                var listChild: UserMenu[] = [];

                for(let i = 0;i < userMenu.length;i++){
                    var idPai = userMenu[i].idPai;

                    if(idOffice === 1){ // director
                        if(!userMenu[i].accessDirector){
                            continue;
                        }
                    }else if(idOffice === 14){ // team leader
                        if(!userMenu[i].accessTeamLeader){
                            continue;
                        }
                    }else{
                        if(!userMenu[i].accessAnalyst){
                            continue;
                        } 
                    }

                    if(idPai === id){
                        listChild.push({ name: userMenu[i].name, url: userMenu[i].url, icon: userMenu[i].icon });
                    }
                }

                if(listChild.length > 0){
                    menuList.push({ name: idPaiList[i].name, url: idPaiList[i].url, icon: idPaiList[i].icon, child: true, childList: listChild });
                }else{
                    menuList.push({ name: idPaiList[i].name, url: idPaiList[i].url, icon: idPaiList[i].icon, child: false, childList: [] });
                }
            }

        }

        return menuList;

    }

    async validateUserFirstAccess(accessUser: any, transactionUser: Transaction){

        const verifyUser = await UserConfirmEmail.findOne({ where: { cod: accessUser.cod, token: accessUser.token }});
        if(!verifyUser){
            throw new AuthError('Código informado não é válido!');
        }

        accessUser.password = await bcrypt.hash(accessUser.password, 8);

        await UserConfirmEmail.destroy({ where: { id: verifyUser.id }, transaction: transactionUser});
        await User.update({ status: 1, password: accessUser.password }, { where: {id: verifyUser.idUser }, transaction: transactionUser});

        return;
    }

    async validateUserPolicy(idUser: number, sector: string, typeUser: number){

        // typeUser -> 0 - no office / 1 - director / 2 - team leader / 3 - director or team leader

        try {

            if(sector === 'influencer'){
                var idSector = 48;
            }else if(sector === 'legal'){
                var idSector = 45;
            }else if(sector === 'wording'){
                var idSector = 51;
            }else{
                return false;
            }

            if(typeUser !== 0){
                if(typeUser === 1){
                    const userOffice: boolean = await authRepository.userPolicyComplete(idUser, 1, idSector);
                    return userOffice;
                }else if(typeUser === 2){
                    const userOffice: boolean = await authRepository.userPolicyComplete(idUser, 14, idSector);
                    return userOffice;
                }else if(typeUser === 3){
                    const userOffice: boolean = await authRepository.userPolicyComplete(idUser, 14, idSector, true);
                    return userOffice;
                }else {
                    return false;
                }
            }else{
                const userOffice: boolean = await authRepository.userTypeSector(idUser, idSector);
                return userOffice;
            }
            
        } catch (error) {
            throw error;
        }

    }

    async validateTypeUserInfluencer(idUser: any, idSquad: number, type: number){

        try {
            
            const userType = await authRepository.userTypeInfluencer(idUser, idSquad, type);
            return userType;

        } catch (error) {
            throw error;
        }

        return;
    }

    async validateTypeTeamLeaderInfluencer(idUser: any, idSquad: number, type: number){

        try {
            
            const userType = await authRepository.teamLeaderTypeInfluencer(idUser, idSquad, type);
            return userType;

        } catch (error) {
            throw error;
        }

        return;
    }

    async validateUserProspection(idUser: any){

        try {
            
            const isTeamLeaderProspection = await authRepository.teamLeaderProspectionWithoutSquadInfluencer(idUser);
            const isUserProspection = await authRepository.userProspectionWithoutSquadfluencer(idUser);

            if(isTeamLeaderProspection || isUserProspection){
                return true;
            }else{
                return false;
            }

        } catch (error) {
            throw error;
        }

        return;
    }

    async verifyUserSector(idUser: number) {

        try {

            const sectorUser = await authRepository.userSector(idUser)
            return sectorUser

        }
        catch (error) {
            throw error
        }
    }

}

export default new AuthService();