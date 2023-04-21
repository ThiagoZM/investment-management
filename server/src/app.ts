//Express e http
import express, { Express } from 'express';
import { createServer, Server } from 'http';

//Manipulação de diretórios
import path from 'path';
import { existsSync, mkdirSync } from 'fs';

//Middlewares
import {
  bodyParser,
  cors,
  urlEncoded,
} from './shared/middlewares';

//Config
import { APP_CONFIG } from './shared/config/app.config';
import { userRouter } from './user/user.router';

export default class App {
  port!: number;
  application!: Express;
  baseUrl!: string;
  private _server!: Server

  constructor() {
    this.port = APP_CONFIG.APP_PORT;
    this.baseUrl = '/api';
    this.application = express();
    this._server = createServer(this.application);
    this.middlewares();
    this.routes();
  }

  createStorage() {
    const storagePath = path.join(__dirname, '../storage');

    if (!existsSync(storagePath)) {
      mkdirSync(storagePath, { recursive: true });
    }
  }

  middlewares() {
    this.application.use(bodyParser);
    this.application.use(cors);
    this.application.use(urlEncoded);
  }

  routes() {
    this.application.use(`${this.baseUrl}/users`, userRouter);
  }

  create() {
    this._server.listen(this.port, () => {
      console.log(`Servidor inciado na port: ${this.port}`)
    })
  }
}

export const app = new App();