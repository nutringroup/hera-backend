import SES from 'aws-sdk/clients/ses';
import { recoveryPassword, tokenAccessLogin } from '../shared/email_config';

class EmailController {

  client;
  constructor(){
    this.client = new SES({
      region: 'sa-east-1'
    });
  }

  async sendEmail(email: string, codigo: string, typeOperation: number){ 


    let descricao: string;
    (typeOperation === 0) ? descricao = 'Token para o login' : typeOperation === 1 ? descricao = 'Recuperação de senha' : descricao = 'Recuperação de senha';

    try{
      await this.client.sendEmail({
        Source: 'Hera-Nutrin <contato@nutrinhera.com.br>',
        Destination: {
          ToAddresses: [
            email
          ]
        },
        Message: {
          Subject: {
            Data: descricao
          },
          Body: {
            Html: {
              Data: (typeOperation === 0) ? tokenAccessLogin(codigo): typeOperation === 1 ? recoveryPassword(codigo) : recoveryPassword(codigo)
            }
          }
        },
        //ConfigurationSetName: 'Hera'
      }).promise();

      return;
    }catch(error){
      throw error;
    }
  }


}

export default new EmailController();