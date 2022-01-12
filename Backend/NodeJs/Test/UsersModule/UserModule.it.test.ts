// var expect = require("chai").expect;
// var usersmodule = require("../../dist/ViewModels/UsersModel");
// var request = require("request");

import { expect } from 'chai';
import * as request from 'request';
import { Fix } from './Fix';

/*
    describe("", function() {

    })
        it("", function(){

        });

     expect().to.equal()

*/


describe("Logs in a user", function () {

    let url1 = 'https://temp-name-1.herokuapp.com/v1/users/login';
    it("Returns status 200", function () {
        let body = {
            "email": "twinklebagdi@gmail.com",
            "password": "Twinks@99"
        }
        request.post({
            url: url1,
            method: "POST",
            json: body
        }, function (error, response, body) {
            //console.log(error, response + "...", body + "?")
            expect(response.statusCode).to.equal(200);
            //done();
        });
    });

    it("Return Valid user", function () {
        let body = {
            "email": "twinklebagdi@gmail.com",
            "password": "Twinks@99"
        }
        request.post({
            url: url1,
            method: "POST",
            json: body
        }, function (error, response, body) {
            expect(body.message).to.equal("Logged in!");
        });
    });

    it("Return User not found", function () {
        let body = {
            "email": "twinklebagd@gmail.com",
            "password": "Twinks@99"
        }
        request.post({
            url: url1,
            method: "POST",
            json: body
        }, function (error, response, body) {
            expect(body.message).to.equal("User not found with given username");
        });
    });

    it("Return User not verified", function () {
        let body = {
            "email": "jhanvisdesai@gmail.com",
            "password": "Twinks@99"
        }
        request.post({
            url: url1,
            method: "POST",
            json: body
        }, function (error, response, body) {
            expect(body.message).to.equal("Please verify email");
        });
    });

    it("Return Invalid Password", function () {
        let body = {
            "email": "twinklebagdi@gmail.com",
            "password": "Twinks@9"
        }
        request.post({
            url: url1,
            method: "POST",
            json: body
        }, function (error, response, body) {
            expect(body.message).to.equal("Invalid password");
        });
    });
})


describe("Registers a user", function () {

    let url1 = 'https://temp-name-1.herokuapp.com/v1/users/registration';

    it("Return User already exits", function () {
        let body = {
            "email": "vaishnavisdesai@gmail.com",
            "password": "123456",
            "name": "Vaishnavi Desai",
            "role": "farmer",
            "phone": "9967031549",
            "address": "B - 803, Sharaddha, Bldg no 11, Rd no 2, New Shastri Nagar, Goregaon West",
            "district": "Mumbai",
            "state": "Maharashtra",
            "pincode": "400104"
        }
        request.post({
            url: url1,
            method: "POST",
            json: body
        }, function (error, response, body) {
            expect(body.message).to.equal("User with the given username already exists");
        });
    });

    it("Return User not verified", function () {
        let body = {
            "email": "jhanvisdesai@gmail.com",
            "password": "123456",
            "name": "Vaishnavi Desai",
            "role": "farmer",
            "phone": "9967031549",
            "address": "B - 803, Sharaddha, Bldg no 11, Rd no 2, New Shastri Nagar, Goregaon West",
            "district": "Mumbai",
            "state": "Maharashtra",
            "pincode": "400104"
        }
        request.post({
            url: url1,
            method: "POST",
            json: body
        }, function (error, response, body) {
            expect(body.message).to.equal("Please verify email");
        });
    });


    it("Return Registration Successful", function () {
        let body = {
            "email": "nutumalhotra@gmail.com",
            "password": "123456",
            "name": "Vaishnavi Desai",
            "role": "farmer",
            "phone": "9967031549",
            "address": "B - 803, Sharaddha, Bldg no 11, Rd no 2, New Shastri Nagar, Goregaon West",
            "district": "Mumbai",
            "state": "Maharashtra",
            "pincode": "400104"
        }
        request.post({
            url: url1,
            method: "POST",
            json: body
        }, function (error, response, body) {
            expect(body.message).to.equal("Saved!");
            Fix.deletereguser().then().catch(e => { console.log(e) })
        });
    });
})


