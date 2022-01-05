import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import * as http from 'http';
import * as path from 'path';

import { InputValidationError } from 'openapi-validator-middleware';
import { configuration } from './appConfig';
import { loggercntrlr } from './LoggerCntrlr';


export class ServerAPI {

  private apiApp: express.Express;
  private port: number;


  public constructor() {
    this.apiApp = express();
    this.port = configuration.webport;
    this.apiApp.disable('x-powered-by');
    this.apiApp.disable('etag');
  }

  public async start(): Promise<void> {
    const server: http.Server = this.apiApp.listen(this.port, () => {
      console.log(`------------API Web Server Starting on port ${this.port} -------------`);
    });

  }

  public setMiddleware(): void {
    this.apiApp.use(helmet());
    this.apiApp.use(cors());
    this.apiApp.use(cookieParser());
    this.apiApp.use(express.json());
    this.apiApp.use(express.urlencoded({ 'extended': true }));
    this.apiApp.use(express.static(path.join(__dirname, '..', 'static')));
  }

  public setRouterMiddleWare(): void {


    this.apiApp.use('/logger', loggercntrlr.router);

    this.apiApp.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (err instanceof InputValidationError) {
        return res.status(400).json({ more_info: JSON.stringify(err.errors) });
      }
      next();
    });

  }

}

const api: ServerAPI = new ServerAPI();
api.setMiddleware();
api.setRouterMiddleWare();
api.start();

