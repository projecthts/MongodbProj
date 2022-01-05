
import * as express from 'express';
import * as httpStatus from 'http-status-codes';

// import { Validator } from './validator';
//import { I1 } from './interfaces';


class LoggerCntrlr {

  public router: express.Router = express.Router();
  public constructor() {
    LoggerCntrlr.setRouterMiddleWare(this.router);

  }

  public static setRouterMiddleWare(router: express.Router): void {
    router.route('/')
    .post(LoggerCntrlr.log);

  }

  public static log(req: express.Request, res: express.Response){
      console.log(req.body.message);
      res.sendStatus(200);
  }

}

export let loggercntrlr = new LoggerCntrlr();


