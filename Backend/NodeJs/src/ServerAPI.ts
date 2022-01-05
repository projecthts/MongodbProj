import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as helmet from 'helmet';
import * as http from 'http';
import * as path from 'path';
import * as session from 'express-session';
import * as mongoose from 'mongoose';
import * as passport from 'passport';

import { InputValidationError } from 'openapi-validator-middleware';
import { configuration } from './support/appConfig';
import { userscntrlr } from './controller/UsersCntrlr';
import { locationcntrlr } from './controller/LocationCntrlr';
import { emailservicecntrlr } from './controller/EmailserviceCntrlr';
import { productscntrlr } from './controller/ProductsCntrlr';
import { farmerscntrlr } from './controller/FarmersCntrlr';
import { consumercntrlr } from './controller/ConsumerCntrlr';
import { logicticscntrlr } from './controller/LogisticsCntrlr';

import { keys } from './support/Keys';
import {passport_config as pc} from './support/PassportConfig'
import { companystatscntrlr } from './controller/CompanystatsCntrlr';
import { autocompletecntrlr } from './controller/AutoCompleteCntrlr';
import { twiliosmsservicecntrlr } from './controller/TwilioSmsServiceCntrlr';




export class ServerAPI {

  private apiApp: express.Express;
  private port: number;


  /**
  * The method constructor. Constructor
  *
  */
  public constructor() {
    this.apiApp = express();
    this.port = configuration.webport;
    this.apiApp.disable('x-powered-by');
    this.apiApp.disable('etag');

    //mongoDB Atlas connect
    mongoose.connect(keys.serverkeys.MongoURI, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(val => { console.log('Mongo DB connection established') })
    .catch(e => { console.log('Mongo DB connection Failed', e) });
  }

  /**
  * The method start. 
  *
  * @returns Promise<void>
  */
  public async start(): Promise<void> {
    const server: http.Server = this.apiApp.listen(this.port, () => {
      console.log(`------------API Web Server Starting on port ${this.port} -------------`);
    });
  }

  /**
  * The method setMiddleware. 
  *
  * @returns void
  */
  public setMiddleware(): void {
    this.apiApp.use(helmet());
    this.apiApp.use(cors({
      origin: ['http://localhost:4200', 'http://127.0.0.1:4200', 'http://localhost:4400', 'http://localhost:5001'],
      credentials: true
    }));
    this.apiApp.use(cookieParser());
    this.apiApp.use(express.json());

    // express session config
    this.apiApp.use(session({
      secret: keys.serverkeys.SessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {secure: false}
    }));

    //passport initialize
    this.apiApp.use(passport.initialize());
    this.apiApp.use(passport.session());

    //passport config
    passport.use(pc.strategy());
    passport.serializeUser(pc.serialize());
    passport.deserializeUser(pc.deserialize());

    this.apiApp.use(express.urlencoded({ 'extended': true }));
    this.apiApp.use(express.static(path.join(__dirname, '..', 'static')));
  }

  /**
  * The method setRouterMiddleWare. 
  *
  * @returns void
  */
  public setRouterMiddleWare(): void {
    this.apiApp.use('/v1/users', userscntrlr.router);
    this.apiApp.use('/v1/location', locationcntrlr.router);
    this.apiApp.use('/v1/emailservice', emailservicecntrlr.router);
    this.apiApp.use('/v1/products', productscntrlr.router);
    this.apiApp.use('/v1/farmers', farmerscntrlr.router);
    this.apiApp.use('/v1/consumer', consumercntrlr.router);
    this.apiApp.use('/v1/logistics', logicticscntrlr.router);
    this.apiApp.use('/v1/companystats', companystatscntrlr.router);
    this.apiApp.use('/v1/twiliosms',twiliosmsservicecntrlr.router);
    this.apiApp.use('/v1/autocomplete', autocompletecntrlr.router);
    this.apiApp.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
      if (err instanceof InputValidationError) {
        return res.status(400).json({ more_info: JSON.stringify(err.errors) });
      } 
    });
  }

}


const api: ServerAPI = new ServerAPI();
api.setMiddleware();
api.setRouterMiddleWare();
api.start();

