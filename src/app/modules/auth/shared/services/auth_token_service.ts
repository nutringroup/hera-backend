import jwt from 'jsonwebtoken';
import AuthConfig  from '../../../../../config/auth';
import AuthError from '../../../../shared/exceptions/auth/auth_exception';

class AuthTokenService {

    createTokenJWT(idUser: number, typeOperation: number, idProfile?: number, idOffice?: number){

        if(typeOperation === 0) // token to return after login
            return jwt.sign({id: idUser, profile: idProfile, idOffice: idOffice, time: new Date()}, AuthConfig.cod!, {expiresIn: AuthConfig.expiresIn});
        else // token to create login
            return jwt.sign({id: idUser, time: new Date()}, AuthConfig.cod!, {expiresIn: AuthConfig.expiresInTokenLogin});
    }

    validateToken(token: string){

        try {

            jwt.verify(token, AuthConfig.cod!, (err: any, decoded: any) => {
                if (err || !decoded) {
                    throw new AuthError("Token Expirado!");
                }
            });
            
        } catch (error) {
            throw error;
        }
    }

    generateTokenDigits() {
        return String(Math.floor(1000 + Math.random() * 9000));
    }

}

export default new AuthTokenService();