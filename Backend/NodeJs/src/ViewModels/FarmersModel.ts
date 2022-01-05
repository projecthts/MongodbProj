import { I6_0, IGetResponse, IPostResponse } from '../support/Interfaces';
import { StatusCodes } from 'http-status-codes';
import { product } from '../DatabaseSchemaModels/Product';
import { ongoingorders } from '../DatabaseSchemaModels/OngoingOrders';
import { logisticsorders } from '../DatabaseSchemaModels/LogisticsOrders';
import { Document } from 'mongoose';
import { users } from '../DatabaseSchemaModels/UserData';
import { account } from '../DatabaseSchemaModels/Account';
import { bids } from '../DatabaseSchemaModels/Bids';
import * as nm from 'nodemailer';


interface IProduct{
  uid: string;
}
export class FarmersModel {

  /**
  * The method getShipments. undefined
  *
  * @param body of type any
  * @returns IResponse
  */

  public static getProduct(id: String): Promise<any> {
    return new Promise((resolve, reject) => {
      product.find({ uid: id }).then(res => {
        return resolve(res);
      })
        .catch(e => {
          return reject(e);
        })
    })
  }

  public static getFarmerShipments(ids: [string]): Promise<any> {
    return new Promise((resolve, reject) => {
      let regex = ids.map(function (e) { return new RegExp(e, "i"); });
      logisticsorders.find({ "ItemsId": { "$in": regex } }).then(res => {
        return resolve(res);
      })
        .catch(e => {
          return reject(e);
        })
    })
  }

  public static getShipments(id: String): Promise<IGetResponse> {
    return new Promise((resolve, reject) => {
      this.getProduct(id).then(res => {
        let arr: any = [];
        for (let x of res) {
          arr.push(x._id);
        }
        this.getFarmerShipments(arr).then(res => {
          return resolve({ "statusCode": 0, "message": "Farmer Ongoing Shipments", "payload": res });
        })
          .catch(e => {
            return reject({ "statusCode": 2, "message": e, "payload": "" });
          })

      })
        .catch(e => {
          return reject({ "statusCode": 2, "message": e, "payload": "" });
        })

    })
  }

  public static postbid(body: I6_0): Promise<IPostResponse> {
    return new Promise((resolve, reject) => {

      users.findOne({_id: body.farmuid}).then((farmer: any) => {
        account.findOne({uid: body.consumeruid}).then((con: any) => {
          var transporter = nm.createTransport({
            service: 'gmail',
            auth: {
              user: 'twinkishavaish@gmail.com',
              pass: '0618062020'
            }
          });
    
          var mailOptions = {
            from: 'twinkishavaish@gmail.com',
            to: String(con.email),
            subject: "Bidding Request Accepted",
            html: "Hello,<br>" + "Your bid for quantity " + body.quantity + "Kgs and cost Rs." + body.cost + " has been acccepted. Please contact the Farmer <br>" + "Name: " + farmer.name + "<br>Phone No.: " + farmer.phone + "<br>E-mail : " + farmer.email
          };
          transporter.sendMail(mailOptions).then(res => {
            bids.findByIdAndUpdate(body.bidid, {"status": "Accepted"}).then(val => {
              resolve({ "statusCode": 0, "message": "mail sent"});
            })
            .catch(e => {
              reject({ "statusCode": 2, "message": e});
            })
          })
          .catch(e => {
            reject({ "statusCode": 2, "message": e});
          })
        })
        .catch(e => {
          reject({ "statusCode": 2, "message": e});
        })
      })
      .catch(e => {
        reject({ "statusCode": 2, "message": e});
      })
     

    })
  }

}


export let farmersmodel = new FarmersModel();


