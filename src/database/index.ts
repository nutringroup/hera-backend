const Sequelize = require("sequelize");
const databaseConfig = require("../config/database"); 

const models: any[] = [];

class Database {
  connection: any;
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
