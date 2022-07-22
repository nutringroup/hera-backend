import jwt from 'jsonwebtoken';
import { Transaction } from "sequelize/types";
import AuthConfig  from '../../../../../../config/auth';
import user_repository from '../../repository/user_repository';
import AuthError from "../../../../../shared/exceptions/auth/auth_exception";
import User from "../models/user";
import UserConfirmEmail from "../models/user_confirm_email";
import UserOffice from "../models/user_office";
import UserCodInfluencer from '../models/user_cod_influencer';
import UserCodError from '../../../../../shared/exceptions/user/user_cod_exception';


class UserService {

    async createNewUser(newUser: any, transactionUser: Transaction){

        try {

            const emailExist = await User.findOne({where:{ email: newUser.email}});

            if(emailExist){
                throw new AuthError('Email já cadastrado');
            }

            const userCreated = await User.create({ name: newUser.name, email: newUser.email, status: 2, password: '', token: '', tokenTimeValidation:'', emailSend: newUser.email }, { transaction: transactionUser });
            await UserOffice.create({ idUser: userCreated.id, idOfficeSector: newUser.idOfficeSector }, { transaction: transactionUser });

            const token = jwt.sign({ id: userCreated.id }, AuthConfig.cod!,{expiresIn: AuthConfig.expiresInEmail});
            const codPassword = Math.floor(Math.random() * 10000).toString();

            await UserConfirmEmail.create({ idUser: userCreated.id, token: token, cod: codPassword }, { transaction: transactionUser });

            return;
            
        } catch (error) {
            throw error;
        }

    }

    async changePassword(userNewPassword: any, idUser: number){

        try {

            const user = await User.findOne({ where:{ id: idUser } });

            if(!(await user!.passwordVerify(userNewPassword.password))){
                throw new AuthError("Senha atual digitada está inválida!");
            }

            const newPassword = await user!.cryptPassword(userNewPassword.newPassword);
            await User.update({ password: newPassword }, { where: { id: idUser }});
            
            return;
            
        } catch (error) {
            throw error;
        }
    }

    async gellAllUsers(){

        try {

            const userList = await user_repository.getAll();
            let userListFormated: any[] = [];

            if(userList.length > 0)
                userList.forEach( (element: any) => {
                    userListFormated.push({
                        id: element.id,
                        name: element.name,
                        email: element.email,
                        status: element.status,
                        idOfficeSector: element.idOfficeSector,
                        office: {
                            id: element.idOffice,
                            name: element.officeName
                        },
                        sector: {
                            id: element.idSector,
                            name: element.sectorName
                        }
                    });
                });

            return userListFormated;
            
        } catch (error) {
            throw error;
        }

    }

    async validateCodUserInfluencer(idUser: number) {
        
        try {

            const userCod = await UserCodInfluencer.findOne({ attributes: ['cod'], where: { idUser: idUser } });
            if(userCod){
                return userCod.cod;
            }else{
                const user = await User.findOne({ attributes: ['name'], where: { id: idUser } });
                if(user){
                    if(user.name.length >= 4){
                        const userNewCod = user.name.substring(0, 1).toLocaleLowerCase() + user.name.substring(2, 3).toLocaleLowerCase();
                        const userCodExist = await UserCodInfluencer.findOne({ attributes: ['cod'], where: { cod: userNewCod } });
                        if(userCodExist){
                            const userNewCod = user.name.substring(0, 1).toLocaleLowerCase() + user.name.substring(3,4).toLocaleLowerCase();
                            const userCodExist = await UserCodInfluencer.findOne({ attributes: ['cod'], where: { cod: userNewCod } });
                            if(userCodExist){
                                throw new UserCodError();
                            }else{
                                await UserCodInfluencer.create({ idUser: idUser, cod: userNewCod});
                                return userNewCod;
                            }
                        }else{
                            await UserCodInfluencer.create({ idUser: idUser, cod: userNewCod});
                            return userNewCod;
                        }

                    }else{
                        throw new UserCodError("Usuário com menos de 4 letras, não é possível criar o código da prospecção");
                    }

                }else{
                    throw new UserCodError();
                }
            }
            
        } catch (error) {
            throw error;
        }

    }


}

export default new UserService();