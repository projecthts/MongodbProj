import * as express from 'express';


import { Validator } from '../support/Validator';
// import { EmailserviceModel } from '../ViewModels/EmailserviceModel';
import { I1_1 } from '../support/Interfaces';

// var twilio = require('twilio');
import  {Twilio} from 'twilio';


class TwilioSmsServiceCntrlr {

    public router: express.Router = express.Router();

    /**
    * The method constructor. Constructor
    *
    */
    public constructor() {
        TwilioSmsServiceCntrlr.setRouterMiddleWare(this.router);
    }

    /**
    * The method setRouterMiddleWare. 
    *
    * @param router of type express.Router
    * @returns void
    */
    public static setRouterMiddleWare(router: express.Router): void {
        router.route('/sendSMS')
            .get(TwilioSmsServiceCntrlr.sendSms);

    }
    public static sendSms(req: express.Request, res: express.Response): void {
        var accountSid = 'AC5708e58291a053b69f3d8f79ab7037f1'; // Your Account SID from www.twilio.com/console
        var authToken = '28b05ec786f47a85adcdc9cd8d867d92';   // Your Auth Token from www.twilio.com/console

        
        var client = new Twilio(accountSid, authToken);
        console.log("API hit!");
        client.messages.create({
            body: 'Hello from Node',
            to: '+919029026901',  // Text this number
            from: '+18187413531' // From a valid Twilio number
        })
            .then((message: any )=> {console.log(message),
            res.status(200)});
            
    }

}


export let twiliosmsservicecntrlr = new TwilioSmsServiceCntrlr();
