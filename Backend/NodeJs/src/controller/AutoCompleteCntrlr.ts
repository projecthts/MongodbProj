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
    // let autocom = new autocomplete(req.body);
    // autocom.save().then(resp => {
    //   res.status(200).send(resp);
    // })
    //   .catch(resp => {
    //     res.status(500).send(resp);
    //   });;



    let categoriesJson = [
      {
        "id": "fruits", "name": "Fruits", "Showcategory": false, "value": [
          {
            "Name": "Apple Banana Pear", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Apple", "id": "apple", "checked": false }, { "name": "Banana", "id": "banana", "checked": false },
            { "name": "Pear", "id": "pear", "checked": false }]
          },
          {
            "Name": "Berries", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Strawberry", "id": "strawberry", "checked": false }, { "name": "Blueberry", "id": "blueberry", "checked": false },
            { "name": "Cherry", "id": "cherry", "checked": false }, { "name": "Raspberry", "id": "raspberry", "checked": false }]
          },
          {
            "Name": "Citrus Fruits", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Orange", "id": "orange", "checked": false }, { "name": "Lemon", "id": "lemon", "checked": false },
            { "name": "Mosambi", "id": "mosambi", "checked": false }, { "name": "Kiwi", "id": "kiwi", "checked": false }]
          },
          {
            "Name": "Grapes Chickoo Pomegranate", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Grapes", "id": "grapes", "checked": false },
            { "name": "Chickoo", "id": "chickoo", "checked": false }, { "name": "Pomegranate", "id": "pomegranate", "checked": false }]
          },
          {
            "Name": "Mangoes", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Mangoes", "id": "mangoes", "checked": false }]
          },
          {
            "Name": "Melons", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Watermelon", "id": "watermelon", "checked": false },
            { "name": "Muskmelon", "id": "muskmelon", "checked": false }, { "name": "Sunmelon", "id": "sunmelon", "checked": false }]
          },
          {
            "Name": "Plums Peaches Figs Apricots", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Plums", "id": "plum", "checked": false }, { "name": "Peach", "id": "peach", "checked": false },
            { "name": "Fig", "id": "fig", "checked": false }, { "name": "Apricot", "id": "apricot", "checked": false }]
          },
          {
            "Name": "Dry Fruits and Dry seeds", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Dry Fruits", "id": "dryfruits", "checked": false },
            { "name": "Dry Seeds", "id": "dryseeds", "checked": false }]
          },
          { "Name": "Other Fruits", "id": "otherfruits", "Havesubsubcategories": false, "Showsubcategories": false, "checked": false, "sub": [] },
        ]
      },

      {
        "id": "dailyvegetables", "name": "Daily Vegetables", "Showcategory": false, "value": [
          {
            "Name": "Onions Potatoes Tomatoes", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Onion", "id": "onions", "checked": false },
            { "name": "Potato", "id": "potatoes", "checked": false }, { "name": "Tomato", "id": "tomatoes", "checked": false }]
          },
          {
            "Name": "Beans Brinjal Okra", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Beans", "id": "beans", "checked": false },
            { "name": "Brinjal", "id": "brinjal", "checked": false }, { "name": "Okra", "id": "okra", "checked": false }]
          },
          {
            "Name": "Broccoli Cabbage Cauliflower", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Broccoli", "id": "broccoli", "checked": false },
            { "name": "Cabbage", "id": "cabbage", "checked": false }, { "name": "Cauliflower", "id": "cauliflower", "checked": false }]
          },
          {
            "Name": "Gourd Pumpkin Drumstick", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Bitter Gourd - Karela", "id": "karela", "checked": false, },
            { "name": "Ridge Gourd - Dodka", "id": "dodka", "checked": false }, { "name": "Bottle Gourd - Lauki", "id": "lauki", "checked": false, },
            { "name": "Snake Gourd - Parwal", "id": "parwal", "checked": false }, { "name": "Tinda", "id": "tinda", "checked": false },
            { "name": "Pumpkin", "id": "pumpkin", "checked": false }, { "name": "Drumstick", "id": "drumstick", "checked": false }]
          },
          {
            "Name": "Chillies Garlic Lemon Ginger", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Chillies", "id": "chillies", "checked": false, }, { "name": "Garlic", "id": "garlic", "checked": false, },
            { "name": "Lemon", "id": "lemon", "checked": false, }, { "name": "Ginger", "id": "ginger", "checked": false, }]
          },
          {
            "Name": "Cucumber Capsicum", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Cucumber", "id": "cucumber", "checked": false, },
            { "name": "Red Capsicum", "id": "redcapsicum", "checked": false, },
            { "name": "Yellow Capsicum", "id": "yellowcapsicum", "checked": false, },
            { "name": "Green Capsicum", "id": "greencapsicum", "checked": false, }]
          },
          {
            "Name": "Peas Corn", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Peas", "id": "peas", "checked": false, }, { "name": "Corn", "id": "corn", "checked": false, }]
          },
          {
            "Name": "Root Vegetables", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Beetroot", "id": "beetroot", "checked": false, }, { "name": "Carrot", "id": "carrot", "checked": false, },
            { "name": "Turnip", "id": "turnip", "checked": false, }, { "name": "Radish", "id": "radish", "checked": false, }]
          },
          {
            "Name": "Other Daily Vegetables", "id": "otherdailyvegetables", "Havesubsubcategories": false,
            "checked": false, "Showsubcategories": false, "sub": []
          },
        ]
      },

      {
        "id": "exoticvegetables", "name": "Exotic Vegetables", "Showcategory": false, "value": [
          {
            "Name": "Avocados Peppers", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Avocados", "id": "avocados", "checked": false, },
            { "name": "Pepper", "id": "pepper", "checked": false, }]
          },
          {
            "Name": "Broccoli Zucchini", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Broccoli", "id": "broccoli", "checked": false, },
            { "name": "Zucchini", "id": "zucchini", "checked": false, }]
          },
          {
            "Name": "Asparagus Artichokes", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Asparagus", "id": "asparagus", "checked": false, },
            { "name": "Artichoke", "id": "artichoke", "checked": false, }]
          },
          {
            "Name": "Celery Fennel Leeks", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Celery", "id": "celery", "checked": false, },
            { "name": "Fennel", "id": "fennel", "checked": false, }, { "name": "Leek", "id": "leek", "checked": false, }]
          },
          {
            "Name": "Edible Flowers", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Edible Flowers", "id": "edibleflowers", "checked": false, }]
          },
          {
            "Name": "Lettuce Leafy Vegetables", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Lettuce", "id": "lettuce", "checked": false, },
            { "name": "Leafy Vegetables", "id": "leafyveg", "checked": false, }]
          },
          {
            "Name": "Mushrooms", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Mushrooms", "id": "mushrooms", "checked": false, }]
          },
          {
            "Name": "Other Exotic Vegetables", "id": "otherexoticvegetables", "Havesubsubcategories": false
            , "checked": false, "Showsubcategories": false, "sub": []
          },
        ]
      },

      {
        "id": "organic", "name": "Organic", "Showcategory": false, "value": [
          {
            "Name": "Organic Fruits", "id": "organicfruits", "Havesubsubcategories": false, "Showsubcategories": false,
            "checked": false, "sub": []
          },
          {
            "Name": "Organic Vegetables", "id": "organicvegetables", "Havesubsubcategories": false, "Showsubcategories": false,
            "checked": false, "sub": []
          },
        ]
      },

      {
        "id": "exotic", "name": "Exotic", "Showcategory": false, "value": [
          {
            "Name": "Exotic Fruits", "id": "exoticfruits", "Havesubsubcategories": false, "Showsubcategories": false,
            "checked": false, "sub": []
          },
          {
            "Name": "Exotic Vegetables", "id": "exoticvegetables", "Havesubsubcategories": false, "Showsubcategories": false,
            "checked": false, "sub": []
          },
        ]
      },

      {
        "id": "herbsandseasoning", "name": "Herbs and Seasoning", "Showcategory": false, "value": [
          {
            "Name": "Lemon Ginger Garlic", "Havesubsubcategories": true, "Showsubcategories": false,
            "sub": [{ "name": "Lemon", "id": "lemon", "checked": false }, { "name": "Ginger", "id": "ginger", "checked": false },
            { "name": "Garlic", "id": "garlic", "checked": false }]
          },
          {
            "Name": "Indian Herbs", "id": "indianherbs", "Havesubsubcategories": false, "Showsubcategories": false,
            "checked": false, "sub": []
          },
          {
            "Name": "Other Herbs and Seasoning", "id": "otherherbsandseasoning", "Havesubsubcategories": false,
            "Showsubcategories": false, "checked": false, "sub": []
          },
        ]
      }];

    for (let cat of categoriesJson) {
      (new autocomplete({ "word": cat.name.replace(/ /g, "\n"), "displayname": cat.name, "category": cat.name })).save()
      for (let subcat of cat.value) {
        (new autocomplete({ "word": subcat.Name.replace(/ /g, "\n"), "displayname": subcat.Name, "category": cat.name + " / " + subcat.Name })).save()
        if (subcat.Havesubsubcategories)
          for (let subsubcat of subcat.sub)
            (new autocomplete({ "word": subsubcat.name.replace(/ /g, "\n"), "displayname": subsubcat.name, "category": cat.name + " / " + subcat.Name + " / " + subsubcat.name })).save()
      }
    }
    res.status(200);

  }

  public static addautocomplete(req: express.Request, res: express.Response): void {
    autocomplete.findOne({ "displayname": req.body.displayname })
      .then(val => {
        if (val) { res.status(200).send({ "statusCode": 0, "message": "Already exists" }); return Promise.reject("Ignore"); }
        let autocom = new autocomplete(req.body);
        autocom.save();
      })
      .then(resp => {
        res.status(200).send({ "statusCode": 0, "message": "Saved" });
      })
      .catch(resp => {
        if (resp != "Ignore")
          res.status(500).send({ "statusCode": 2, "message": resp });
      });
  }

  public static ifin(arr: any[], val: any) {
    for (let x of arr) {
      if (String(x._id) == String(val._id)) return true;
    }
    return false;
  }

  public static search2(req: express.Request, res: express.Response): void {
    let word: string = req.query.word?.toString()!;
    let words = word.split(' ').join('|')
    let matchstr1withstr2: any;
    let matchstr1withstr2space: any;
    let matchstr1spacewithstr2: any;
    let matchstr1spacewithstr2space: any;
    autocomplete.find({ "displayname": { "$regex": "^" + word, "$options": "mi" } })
      .then((resp: any) => {
        matchstr1withstr2 = resp;
        if (resp.length >= 5) return Promise.reject("Actually resolved");
        return autocomplete.find({ "word": { "$regex": "^" + word, "$options": "mi" } }
        )
      })
      .then((resp: any) => {
        matchstr1withstr2space = resp;
        for (let x of resp) {
          if (!(AutoCompleteCntrlr.ifin(matchstr1withstr2, x))) {
            if (matchstr1withstr2.length >= 5) return Promise.reject("Actually resolved");
            matchstr1withstr2.push(x)
          }
        }
        return autocomplete.find({ "displayname": { "$regex": "^" + "[" + words + "]", "$options": "mi" } }
        )
      })
      .then((resp: any) => {
        matchstr1spacewithstr2 = resp;
        for (let x of resp) {
          if (!(AutoCompleteCntrlr.ifin(matchstr1withstr2, x))) {
            if (matchstr1withstr2.length >= 5) return Promise.reject("Actually resolved");
            matchstr1withstr2.push(x)
          }
        }
        return autocomplete.find({ "word": { "$regex": "^" + "[" + words + "]", "$options": "mi" } }
        )
      })
      .then((resp: any) => {
        matchstr1spacewithstr2space = resp
        for (let x of resp) {
          if (!(AutoCompleteCntrlr.ifin(matchstr1withstr2, x))) {
            if (matchstr1withstr2.length >= 5) break;
            matchstr1withstr2.push(x)
          }
        }
        // console.log(matchstr1withstr2);
        res.status(200).send({ "statusCode": 0, "message": "Search successful", "payload": matchstr1withstr2.slice(0, 5) });
      })
      .catch(e => {
        if (e == "Actually resolved") res.status(200).send({ "statusCode": 0, "message": "Search successful", "payload": matchstr1withstr2.slice(0, 5) });
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


  public static search(req: express.Request, res: express.Response): void {
    let word: string = req.query.word?.toString()!;
    // console.log(word.split(" "))
    // let agg = [
    //   {$search: {autocomplete: {query: "Apple", path: "displayname"}}},
    //         {$limit: 5},
    //         {$project: {_id: 0, displayname: 1, word: 1, category: 1}}
    // ];

    let agg = [
      {
        $search: {
          "index": "autocomplete",
          "autocomplete": {
            "path": "displayname",
            "query": word.split(" ")
          }
        }
      },
      {
        $limit: 10
      },
      {
        $project: {
          "_id": 0,
          "displayname": 1,
          "word": 1,
          "category": 1
        }
      }
    ]

    autocomplete.aggregate(agg).then(resp => {
      console.log(resp);
      res.status(200).send({ "statusCode": 0, "message": "Search successful", "payload": resp });
    })
      .catch(err => {
        res.status(500).send({ "statusCode": 1, "message": err, "payload": "" });
      })
  }


}


export let autocompletecntrlr = new AutoCompleteCntrlr();


