import { pastorders } from "../DatabaseSchemaModels/PastOrders";
import { states } from "../DatabaseSchemaModels/States";
import { IGetResponse } from "../support/Interfaces";

export class ComapanystatsModel {

    public static getStats(type: string): Promise<IGetResponse> {
        return new Promise((resolve, reject) => {

            pastorders.find({}).then((res) => {

                if (type == "1") {

                    this.type1Stat(res).then(res => {
                        resolve(res);
                    }).catch(err => {
                        reject(err);
                    });
                }

                if (type == "2") {

                    this.type2Stat(res).then(res => {
                        resolve(res);
                    }).catch(err => {
                        reject(err);
                    });
                }

                if (type == "3") {

                    resolve(this.type3Stat(res));
                }

                if (type == "4") {

                    resolve(this.type4Stat(res));

                }

            }).catch(e => { return reject({ "statusCode": 2, "message": e, "payload": "" }); });
        })
    }

    public static type1Stat(po: any): Promise<IGetResponse> {

        return new Promise((resolve, reject) => {
            let returnBody: any = {};

            states.find({}).then((res: any) => {
                console.log(res);
                for (let state of res) {
                    console.log(state);
                    returnBody[state.name] = 0;
                }

                for (let user of po) {
                    for (let order of user.Orders) {
                        if (order.deliveryaddress.state in returnBody) {
                            returnBody[order.deliveryaddress.state] += 1;
                        }
                    }
                }

                return resolve({ "statusCode": 0, "message": "Orders State-wise success", "payload": returnBody });

            }).catch(e => { return reject({ "statusCode": 2, "message": e, "payload": "" }); })
        })

    }

    public static type2Stat(po: any): Promise<IGetResponse> {

        return new Promise((resolve, reject) => {
            let returnBody: any = {};

            states.find({}).then((res: any) => {
                console.log(res);
                for (let state of res) {
                    console.log(state);
                    returnBody[state.name] = 0;
                }

                for (let user of po) {
                    for (let order of user.Orders) {
                        for (let item of order.itemsList) {
                            console.log(item.total);
                            if (order.deliveryaddress.state in returnBody) {
                                returnBody[order.deliveryaddress.state] += item.total
                            }
                        }

                    }
                }

                return resolve({ "statusCode": 0, "message": "Sales State-wise success", "payload": returnBody });

            }).catch(e => { return reject({ "statusCode": 2, "message": e, "payload": "" }); })
        })

    }

    public static type3Stat(po: any): IGetResponse {

        // return new Promis((resolve, reject) => {
        let returnBody: any = {};
        let d: Date;
        let m: any;
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        for (let user of po) {
            for (let order of user.Orders) {
                d = new Date(Number(order.OrderId.split("?")[1]));
                m = d.getMonth();
                if (months[m] in returnBody) {
                    returnBody[months[m]] += 1;
                }
                else {
                    returnBody[months[m]] = 1;
                }
            }
        }

        return { "statusCode": 0, "message": "Orders Monthly success", "payload": returnBody };

    }

    public static type4Stat(po: any): IGetResponse {


        let returnBody: any = {};
        let d: Date;
        let m: any;
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        for (let user of po) {
            for (let order of user.Orders) {
                d = new Date(Number(order.OrderId.split("?")[1]));
                m = d.getMonth();
                for (let item of order.itemsList) {
                    console.log(item.total);

                    if (months[m] in returnBody) {
                        returnBody[months[m]] += item.total;
                    }
                    else {
                        returnBody[months[m]] = item.total;
                    }
                }

            }
        }

        return { "statusCode": 0, "message": "Sales Monthly success", "payload": returnBody };

    }

}

export let companystatsmodel = new ComapanystatsModel();


