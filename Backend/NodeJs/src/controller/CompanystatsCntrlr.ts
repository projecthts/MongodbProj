import * as express from 'express';
import { ComapanystatsModel } from '../ViewModels/CompanystatsModel';


class CompanystatsCntrlr {

    public router: express.Router = express.Router();

    public constructor() {
        CompanystatsCntrlr.setRouterMiddleWare(this.router);
    }

    public static setRouterMiddleWare(router: express.Router): void {
        router.route('/')
        .get(CompanystatsCntrlr.getStats);

    }

    public static getStats(req: express.Request,res: express.Response){
        let type: string = req.query.type?.toString()!;
        ComapanystatsModel.getStats(type).then(resp => {
            res.status(200).send(resp);
        })
            .catch(resp => {
                res.status(500).send(resp);
            });
    }

}

export let companystatscntrlr = new CompanystatsCntrlr();


