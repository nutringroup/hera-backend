import SES from 'aws-sdk/clients/ses';
import { recoveryPassword, tokenAccessLogin } from '../shared/email_config';
var nodemailer = require('nodemailer');
import fs from 'fs';
var smtpTransport = require('nodemailer-smtp-transport');

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

  async sendEmailWithAttachment(email?: string, codigo?: string){ 

    let attachment = fs.readFileSync(`${__dirname}/../../../../../uploads/rg.pdf`).toString("base64");

    try{
      var transporter = nodemailer.createTransport(smtpTransport({
        host: 'mail.nutrinhera.com.br',
        port: 25,
        auth: {
          user: "sendemail@nutrinhera.com.br",
          pass: "admin@2022!!"
        },
        tls: { rejectUnauthorized: false }
    }));

    await transporter.sendMail({
      from: "sendemail@nutrinhera.com.br",
      subject:" hello ji " ,
      text: "I would like to write dialogue",
      // Attachments:[
      //     {
      //         'filename':'link.txt',
      //         'path': 'E:/STUDIES/CORE SUBJECTS/link.txt'
      //     }
      // ],
      to: "matheuslealcm@gmail.com"
    });
    console.log('foi')
  }catch(error){
    throw error;
  }
  }


}

export default new EmailController();