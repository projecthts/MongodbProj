import { strict as assert } from 'assert';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { DatabaseOperations } from '../../src/support/DatabaseOperations';
import { UsersModel } from '../../src/ViewModels/UsersModel';
import { address } from '../../src/DatabaseSchemaModels/Address';
import * as LocalStrategy from 'passport-local';
import { spy } from 'sinon';

describe("Unit testing the get address function", function () {
    it("check the get address functions pass parameters", function () {
        let findoneaddress = sinon.stub(DatabaseOperations, "FindOneOp").returns(Promise.resolve("Working!"))
        return UsersModel.getAddressCopy("1234").then(res => {
            expect(findoneaddress.getCall(0).args[0]).equal(address);
            expect(findoneaddress.getCall(0).args[1]).to.deep.equal({ uid: '1234' });
            findoneaddress.restore();
        });
    });

    it("check the get address function for authorized user", function () {
        let findoneaddress = sinon.stub(DatabaseOperations, "FindOneOp").returns(Promise.resolve("Working!"))
        return UsersModel.getAddressCopy("1234").then(res => {
            expect(res).to.deep.equal({ "statusCode": 0, "message": "Address", "payload": "Working!" })
            findoneaddress.restore();
        })
    });

    it("check the get address function for unauthorized user", function () {
        let findoneaddress = sinon.stub(DatabaseOperations, "FindOneOp").returns(Promise.resolve(null))
        return UsersModel.getAddressCopy("1234").then(res => {
            expect(res).to.deep.equal({ "statusCode": 3, "message": "User unauthorized", "payload": null })
            findoneaddress.restore();
        })

    });

    it("check the get address function for fails", function () {
        let findoneaddress = sinon.stub(DatabaseOperations, "FindOneOp").returns(Promise.reject("error"))
        return UsersModel.getAddressCopy("1234").catch(e => {
            expect(e).to.deep.equal({ "statusCode": 2, "message": "error", "payload": "" })
            findoneaddress.restore();
        })
    });
})

describe("Unit Testing the login function", function () {
    it("tests the login function", function () {
        expect(UsersModel.login({ "email": "vsd@gmail", "password": "123456" })).to.deep.equal({ "statusCode": 0, "message": "Logged in!" });
    })
})

describe("Unit Testing the authenticate function", function () {

    let callback = function(donee: Function){}
    let done = sinon.spy(callback);

    beforeEach(() => {

    })

    afterEach(() => {
        done.resetHistory();
    })
    //let done = sinon.spy(() => {console.trace();});
    it("Check for unverified email", function (donee) {

        let findtempusers = sinon.stub(DatabaseOperations, "FindOneOp").returns(Promise.resolve("val"));
        callback = (donee) => {
            console.trace();
            console.log(done.args)
            expect(done.args[0]).to.deep.equal(["Please verify email", false]);
            findtempusers.restore();
            donee();
        }
        //let done = sinon.spy();
        //return new Promise((resolve, reject) => {           
        UsersModel.authenticate("vaish@gmail.com", "123456", done);

        setTimeout(() => {console.log(done.args, Date.now())}, 2000);
        //})

        //setTimeout(() => {console.log(done.args, Date.now())}, 3000);
        // if(done.ca)
        // expect(done.args[0]).to.deep.equal(["Please verify email", false]);      
        // console.log(done.args)  
        // done.resetHistory();
        // findtempusers.restore();
        // console.log(done.args)
        // setTimeout(() => {console.log(done.args, Date.now())}, 2000);
    })

    // it("Check for unverified email", function () {
    //     let x1: any;    
    //     let x2: any;
    //     let myresolve: Function;
    //     let myreject: Function;

    //     let findtempusers = sinon.stub(DatabaseOperations, "FindOneOp").returns(Promise.resolve("val"));

    //     return new Promise((resolve, reject) => {
    //         myresolve = resolve;
    //         myreject = reject;
    //         UsersModel.authenticate("vaish@gmail.com", "123456", mydone);
    //     })

    //     expect(done.args[0]).to.deep.equal(["Please verify email", false]);      
    //     console.log(done.args)  
    //     done.resetHistory();
    //     findtempusers.restore();
    //     console.log(done.args)

    //     function mydone(var1: any, var2?: any){
    //         x1 = var1; x2 = var2;
    //         expect([x1, x2]).to.deep.equal(["Please verify email", false]);
    //         done.resetHistory();
    //         findtempusers.restore();
    //         return myreject();
    //     }
    // })

    it.skip("Check for user not found with given username", async function () {
        let findtempusers = sinon.stub(DatabaseOperations, "FindOneOp").returns(Promise.resolve(null));
        // findtempusers.onCall(0).returns(Promise.resolve(null))
        // findtempusers.onCall(1).returns(Promise.resolve(false))
        await UsersModel.authenticate("vaish@gmail.com", "123456", done);
        expect(done.args[0]).to.deep.equal(["User not found with given username", false]);
        console.log(done.args, Date.now())
        done.resetHistory();
        findtempusers.restore();
        console.log(done.args, Date.now())
        setTimeout(() => { console.log(done.args, Date.now()) }, 2000);
    })

    it.skip("Check for invalid password", async function () {
        console.log(done.args, Date.now())
        let findtempusers = sinon.stub(DatabaseOperations, "FindOneOp").returns(Promise.resolve("val"));
        // findtempusers.onCall(0).returns(Promise.resolve("null"))
        // findtempusers.onCall(1).returns(Promise.resolve(true));
        // findtempusers.returns(Promise.resolve(true));
        // let password = sinon.stub(UsersModel, "validatepassword").returns(Promise.resolve(false));

        await UsersModel.authenticate("vaish@gmail.com", "123456", done);
        console.log(done.args)
        expect(done.args[0]).to.deep.equal(["Invalid password", false]);
        done.resetHistory();
        findtempusers.restore();
    })

    it.skip("Check for valid user and password", async function () {

    })

    it.skip("Check for error", async function () {

    })
})

