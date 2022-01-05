

import * as openAPIValidator from 'openapi-validator-middleware';
import * as express from 'express';
import * as path from 'path';

export class Validator {


  public static init(): void {
    // openAPIValidator.init(path.join(__dirname, '..', 'static', 'openapi3.json'));

  }

  private static preValidate(): void {

  }

  public static validate(req: express.Request, res: express.Response, next: express.NextFunction): void {
    // Validator.preValidate();

    // openAPIValidator.validate(req, res, next);

  }


}

Validator.init();


