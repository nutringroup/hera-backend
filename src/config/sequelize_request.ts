import { DataTypes, Model, Sequelize } from "sequelize";
//import sequelizeConnect  from './database';
const sequelizeConnect = require("./database"); 

class SequelizeConnect {

    private static _instance = new SequelizeConnect();

    constructor() { 
        if(SequelizeConnect._instance){
            return SequelizeConnect._instance;
        }
        SequelizeConnect._instance = this;
    }

    static getInstance(): SequelizeConnect {
        return SequelizeConnect._instance;
    }
    
    static get sequelizeConnect() {
        if(process.env.NODE_ENV == 'development'){
            var database = sequelizeConnect.development.database!;
            var username = sequelizeConnect.development.username!;
            var password = sequelizeConnect.development.password!;
            var host = sequelizeConnect.development.host!;
        }else if(process.env.NODE_ENV == 'test'){
            var database = sequelizeConnect.test.database!;
            var username = sequelizeConnect.test.username!;
            var password = sequelizeConnect.test.password!;
            var host = sequelizeConnect.test.host!;
        }else if(process.env.NODE_ENV == 'production'){
            var database = sequelizeConnect.production.database!;
            var username = sequelizeConnect.production.username!;
            var password = sequelizeConnect.production.password!;
            var host = sequelizeConnect.production.host!;
        }else{
            var database = sequelizeConnect.development.database!;
            var username = sequelizeConnect.development.username!;
            var password = sequelizeConnect.development.password!;
            var host = sequelizeConnect.development.host!;
        }

        return new Sequelize(database, username, password, {host: host, dialect: 'mysql'});
    }

}

export default SequelizeConnect;