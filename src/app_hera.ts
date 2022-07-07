import express, { Express } from "express";
import cors from "cors";
import "dotenv/config";

import authRouter from "./routes/auth";
import sectorRouter from "./routes/sector";
import officeRouter from "./routes/office";
import userRouter from "./routes/user";
import moduleRouter from "./routes/module";
import squadRouter from "./routes/squad";
import influencerRouter from "./routes/influencer";
import legalRouter from "./routes/legal";
import prospectionRouter from "./routes/prospection";
import monitoringRouter from "./routes/monitoring";
import wordingRouter from "./routes/wording";
import financialRouter from "./routes/financial";
import notificationRouter from "./routes/notification"

import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("../swagger.json"); 
import database from "./database/index.js";

class App {

  server: Express;

  constructor() {
    this.server = express(); 
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));  
    //this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))); 
  }

  routes() {
    // Definição das rotas por módulos
    this.server.use("/auth2", authRouter); 
    this.server.use("/auth", authRouter); 
    this.server.use("/sector", sectorRouter); 
    this.server.use("/office", officeRouter);
    this.server.use("/user", userRouter);
    this.server.use("/module", moduleRouter);
    this.server.use("/squad", squadRouter);
    this.server.use("/influencer", influencerRouter);
    this.server.use("/prospection", prospectionRouter);
    this.server.use("/legal", legalRouter);
    this.server.use("/monitoring", monitoringRouter);
    this.server.use("/wording", wordingRouter);
    this.server.use("/financial", financialRouter);
    this.server.use("/notification", notificationRouter);
    this.server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // doc swagger 
  }

}

export default new App().server;
