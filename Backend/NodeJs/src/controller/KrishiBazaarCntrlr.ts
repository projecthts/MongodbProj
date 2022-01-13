import * as express from 'express';
import * as path from 'path';


class KrishiBazaarCntrlr {

    public router: express.Router = express.Router();

    /**
    * The method constructor. Constructor
    *
    */
    public constructor() {
        KrishiBazaarCntrlr.setRouterMiddleWare(this.router);
    }

    /**
    * The method setRouterMiddleWare. 
    *
    * @param router of type express.Router
    * @returns void
    */
    public static setRouterMiddleWare(router: express.Router): void {
        router.route('/*')
            .get(KrishiBazaarCntrlr.RouteToFrontend);

    }
    public static RouteToFrontend(req: express.Request, res: express.Response): void {

    let temp=path.join(__dirname, '../../', 'dist/Krishi-Bazaar/index.html');
    console.log(temp);
    res.sendFile(path.join(__dirname, '../../', 'dist/Krishi-Bazaar/index.html'));
    }


}


export let krishibazaarcntrlr = new KrishiBazaarCntrlr();
