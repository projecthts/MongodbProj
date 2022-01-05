import * as express from 'express';


import { Validator } from '../support/Validator';
import { ProductsModel } from '../ViewModels/ProductsModel';
import { I13, I14, I15, I3_0, I3_1, I3_2 } from '../support/Interfaces';
import { autocomplete } from '../DatabaseSchemaModels/AutoComplete';


class ProductsCntrlr {

  public router: express.Router = express.Router();

  /**
  * The method constructor. Constructor
  *
  */
  public constructor() {
    ProductsCntrlr.setRouterMiddleWare(this.router);
  }

  /**
  * The method setRouterMiddleWare. 
  *
  * @param router of type express.Router
  * @returns void
  */
  public static setRouterMiddleWare(router: express.Router): void {
    router.route('/categories')
      .get(Validator.validate, ProductsCntrlr.getCategories);

    router.route('/categories/items/items')
      .get(Validator.validate, ProductsCntrlr.getItems);

    router.route('/categories/items/item')
      .get(Validator.validate, ProductsCntrlr.getItem);

    router.route('/categories/items/filteritems')
      .get(Validator.validate, ProductsCntrlr.getFilterItems);

    router.route('/product')
      .post(Validator.validate, ProductsCntrlr.addProduct);

    router.route('/product/comment')
      .post(Validator.validate, ProductsCntrlr.addreview);

    router.route('/product/bid')
      .post(Validator.validate, ProductsCntrlr.addbid)
      .get(Validator.validate, ProductsCntrlr.getbid);
  }


  public static getCategories(req: express.Request, res: express.Response): void {
    //console.log('getCategories -', req.url);
    let body: I13 = req.body;

    let resp = ProductsModel.getCategories(req.body);
    //res.status(resp.status).send(resp.data);
  }

  /**
  * The method getItems. undefined
  *
  * @param req of type express.Request
  * @param res of type express.Response
  * @returns void
  */
  public static getItems(req: express.Request, res: express.Response): void {
    console.log('getItems -', req.url);
    let id: string = req.query.id?.toString()!;
    let uid: string = req.query.uid?.toString()!;
    //console.log("id =", id); // TODO Delete this later
    //let body: I14 = req.body;

    ProductsModel.getItems(id, uid).then(resp => {
      res.status(200).send(resp);
    })
      .catch(resp => {
        res.status(500).send(resp);
      });
    //res.status(resp.status).send(resp.data);
  }

  public static getFilterItems(req: express.Request, res: express.Response): void {
    //console.log('getFilterItems -', req.url);
    console.log(req.query)
    let id: Array<any> = [];
    if (req.query.id != null) {
      if (Array.isArray(req.query.id!)) { id = req.query.id! }
      else { id = [req.query.id!.toString()] }
    }
    //let id: string[] = req.query.id!.map();
    //console.log("id =", id); // TODO Delete this later
    //let body: I14 = req.body;
    console.log("hit")
    ProductsModel.getFilterItems({ uid: req.query.uid?.toString(), type: req.query.type?.toString(), keywords: req.query.kw?.toString(), category: id }).then(resp => {
      res.status(200).send(resp);
    })
      .catch(resp => {
        res.status(500).send(resp);
      });
    //res.status(resp.status).send(resp.data);
  }

  public static getItem(req: express.Request, res: express.Response): void {
    //console.log('getItem -', req.url);
    let id: string = req.query.id?.toString()!;
    let uid: string = req.query.uid?.toString()!;
    //console.log("id =", id); // TODO Delete this later
    //let body: I14 = req.body;

    ProductsModel.getItem(id, uid).then(resp => {
      res.status(200).send(resp);
    })
      .catch(resp => {
        res.status(500).send(resp);
      });
    //res.status(resp.status).send(resp.data);
  }

  /**
  * The method addProduct. undefined
  *
  * @param req of type express.Request
  * @param res of type express.Response
  * @returns void
  */
  public static addProduct(req: express.Request, res: express.Response): void {
    //console.log('postProduct -', req.url);
    let body: I3_0 = req.body;

    ProductsModel.addProduct(body).then(resp => {
      res.status(200).send(resp);
    })
      .catch(resp => {
        res.status(500).send(resp);
      });;
  }

  public static addreview(req: express.Request, res: express.Response): void {
    //console.log('postProduct -', req.url);
    let body: I3_1 = req.body;

    ProductsModel.addreview(body).then(resp => {
      res.status(200).send(resp);
    })
      .catch(resp => {
        res.status(500).send(resp);
      });;
  }

  public static addbid(req: express.Request, res: express.Response): void {
    //console.log('postProduct -', req.url);
    let body: I3_2 = req.body;

    ProductsModel.addabid(body).then(resp => {
      res.status(200).send(resp);
    })
      .catch(resp => {
        res.status(500).send(resp);
      });;
  }

  public static getbid(req: express.Request, res: express.Response): void {
    //console.log('getItem -', req.url);
    let id: string = req.query.id?.toString()!;
    let role: string = req.query.role?.toString()!;
    //console.log("id =", id); // TODO Delete this later
    //let body: I14 = req.body;

    ProductsModel.getbid(id, role).then(resp => {
      res.status(200).send(resp);
    })
      .catch(resp => {
        res.status(500).send(resp);
      });
    //res.status(resp.status).send(resp.data);
  }

}


export let productscntrlr = new ProductsCntrlr();


