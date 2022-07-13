require('dotenv').config();

module.exports = {



  development: {

    dialect: "mysql", // postgres

    host: process.env.DB_HOST,

    username: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_DATABASE,

    define: {

      timestamps: false,

      underscored: true,

      underscoredAll: true,

    },

  },

  test: {

    dialect: "mysql", // postgres

    host: process.env.DB_HOST_HMG,

    username: process.env.DB_USER_HMG,

    password: process.env.DB_PASSWORD_HMG,

    database: process.env.DB_DATABASE_HMG,

    define: {

      timestamps: false,

      underscored: true,

      underscoredAll: true,

    },

  },

  production: {

    dialect: "mysql", // postgres

    host: process.env.DB_HOST_PROD,

    username: process.env.DB_USER_PROD,

    password: process.env.DB_PASSWORD_PROD,

    database: process.env.DB_DATABASE_PROD,

    define: {

      timestamps: false,

      underscored: true,

      underscoredAll: true,

    },

  }

   

};

