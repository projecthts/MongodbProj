import * as express from 'express';
import { autocomplete } from '../DatabaseSchemaModels/AutoComplete';


class AutoCompleteCntrlr {

  public router: express.Router = express.Router();

  /**
  * The method constructor. Constructor
  *
  */
  public constructor() {
    AutoCompleteCntrlr.setRouterMiddleWare(this.router);
  }

  /**
  * The method setRouterMiddleWare. 
  *
  * @param router of type express.Router
  * @returns void
  */
  public static setRouterMiddleWare(router: express.Router): void {
    router.route('/test')
      .post(AutoCompleteCntrlr.autocomplete)

    router.route('/autocomplete')
      .get(AutoCompleteCntrlr.search)

    router.route('/addautocomplete')
      .post(AutoCompleteCntrlr.addautocomplete)
  }

  /**
  * The method getCategories. undefined
  *
  * @param req of type express.Request
  * @param res of type express.Response
  * @returns void
  */

  public static autocomplete(req: express.Request, res: express.Response): void {
    let autocom = new autocomplete(req.body);
    autocom.save().then(resp => {
      res.status(200).send(resp);
    })
      .catch(resp => {
        res.status(500).send(resp);
      });;
  }

  public static addautocomplete(req: express.Request, res: express.Response): void {
    autocomplete.findOne({"displayname": req.body.displayname})
    .then(val => {if(val){res.status(200).send({ "statusCode": 0, "message": "Already exists"}); return Promise.reject("Ignore");}
                  let autocom = new autocomplete(req.body);
                  autocom.save();
                  })
    .then(resp => {
      res.status(200).send({ "statusCode": 0, "message": "Saved"});
    })
    .catch(resp => {
      if(resp != "Ignore")
      res.status(500).send({ "statusCode": 2, "message": resp});
    });
  }

  public static ifin(arr: any[], val: any){
    for(let x of arr){
      if(String(x._id) == String(val._id)) return true; 
    }
    return false;
  }

  public static search(req: express.Request, res: express.Response): void {
    let word: string = req.query.word?.toString()!;
    let words = word.split(' ').join('|')
    let matchstr1withstr2: any;
    let matchstr1withstr2space: any;
    let matchstr1spacewithstr2: any;
    let matchstr1spacewithstr2space: any;
    autocomplete.find({"displayname": { "$regex": "^" + word, "$options": "mi" }})
    .then((resp: any) => {matchstr1withstr2 =  resp; 
                          if(resp.length >= 5) return Promise.reject("Actually resolved");
                          return autocomplete.find({"word": { "$regex": "^" + word, "$options": "mi" }}
                          )})
    .then((resp: any) => {matchstr1withstr2space = resp;
                          for(let x of resp){
                            if(!(AutoCompleteCntrlr.ifin(matchstr1withstr2, x))){
                              if(matchstr1withstr2.length >= 5) return Promise.reject("Actually resolved");
                              matchstr1withstr2.push(x)
                            }
                          }
                          return autocomplete.find({"displayname": { "$regex": "^" + "[" + words + "]", "$options": "mi" }}
                          )})
    .then((resp: any) => {matchstr1spacewithstr2 = resp;
                          for(let x of resp){
                            if(!(AutoCompleteCntrlr.ifin(matchstr1withstr2, x))){
                              if(matchstr1withstr2.length >= 5) return Promise.reject("Actually resolved");
                              matchstr1withstr2.push(x)
                            }
                          }
                          return autocomplete.find({"word": { "$regex": "^" + "[" + words + "]", "$options": "mi" }}
                          )})
    .then((resp: any) => {matchstr1spacewithstr2space = resp
                          for(let x of resp){
                            if(!(AutoCompleteCntrlr.ifin(matchstr1withstr2, x))){
                              if(matchstr1withstr2.length >= 5) break;
                              matchstr1withstr2.push(x)
                            }
                          }
                          // console.log(matchstr1withstr2);
                          res.status(200).send({ "statusCode": 0, "message": "Search successful", "payload": matchstr1withstr2.slice(0, 5) });
                        })
    .catch(e => { if(e == "Actually resolved") res.status(200).send({ "statusCode": 0, "message": "Search successful", "payload": matchstr1withstr2.slice(0, 5) });
                  else res.status(500).send({ "statusCode": 1, "message": e, "payload": "" });
                })
  //   autocomplete.find(    { "$or": [
  //     {"word": { "$regex": "^" + word, "$options": "mi" }},
  //     {"displayname": { "$regex": "^" + word, "$options": "mi" }}]}
  // ).then((resp:any) => {
  //     autocomplete.find({"word": { "$regex": "^" + "[" + words + "]", "$options": "mi" }}).then((resp2: any) => {
  //       console.log("resp", resp);
  //       // for(let x of resp2) if(!(x in resp))resp.push(x);
  //       res.status(200).send({ "statusCode": 0, "message": "Bid retrieved", "payload": resp.slice(0, 5) });
  //     }).catch(resp => {
  //       res.status(500).send({ "statusCode": 1, "message": resp, "payload": "" });
  //     })
  //   })
  //     .catch(resp => {
  //       res.status(500).send({ "statusCode": 1, "message": resp, "payload": "" });
  //     });;
  }


}


export let autocompletecntrlr = new AutoCompleteCntrlr();


