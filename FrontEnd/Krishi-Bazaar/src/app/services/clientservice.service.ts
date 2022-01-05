import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AllUrls} from '../jsonobjectsdata/urls';

@Injectable({
  providedIn: 'root'
})
export class ClientserviceService {

  

  constructor(private httpClient: HttpClient) { }

  getaddAddress(){
    return this.httpClient.get<any>(AllUrls.address );
  }

  getexistingAddress(params: string){
    return this.httpClient.get<any>(AllUrls.address + params );
  }

  postfinSubmit(body: any){
    return this.httpClient.post<any>(AllUrls.product, body);
  }

  getStates(){
    return this.httpClient.get<any>(AllUrls.state);
  }

  getDistricts(params: string){
    return this.httpClient.get<any>(AllUrls.district + params );
  }

  postaddAddress(body: any){
    return this.httpClient.post<any>(AllUrls.address, body);
  }

  getAidgetWeatherData(){
    return this.httpClient.get<any>(AllUrls.weather);
  }

  deleteCart(){
    return this.httpClient.delete<any>(AllUrls.cart);
  }

  postCartdeleteItem(body: any){
    return this.httpClient.post<any>(AllUrls.cartitem, body);
  }

  getonInit(params: string){
    return this.httpClient.get<any>(AllUrls.bid + params);
  }

  postEmailVeronInit(body: any){
    return this.httpClient.post<any>(AllUrls.emailver, body);
  }

  getFarmerHomegetData(params: string){
    return this.httpClient.get<any>(AllUrls.filter + params);
  }

  getFarmerHomedefaultApiCall(params: string){
    return this.httpClient.get<any>(AllUrls.items + params);
  }

  getFarmerHomeapiCall(params: string){
    return this.httpClient.get<any>(AllUrls.filter + params);
  }

  postForgotPswrdsubmit(body: any){
    return this.httpClient.post<any>(AllUrls.forgotpswrd, body);
  }

  postItemsubmitReview(body: any){
    return this.httpClient.post<any>(AllUrls.comment, body);
  }

  getItemdefaultApiCall(){
    return this.httpClient.get<any>(AllUrls.item);
  }

  postItemaddToCart(body: any){
    return this.httpClient.post<any>(AllUrls.cart, body);
  }

  getItemcallCart(params: string){
    return this.httpClient.get<any>(AllUrls.cart + params);
  }

  getItemsdefaultApiCall(params: string){
    return this.httpClient.get<any>(AllUrls.items + params );
  }

  getItemsapiCall(params: string){
    return this.httpClient.get<any>(AllUrls.filter + params );
  }

  postLoginsubmit(body: any){
    return this.httpClient.post<any>(AllUrls.loginurl, body);
  }

  getOrders(params: string){
    return this.httpClient.get<any>(AllUrls.orders + params );
  }

  postPaymentrazorPaySuccessHandler(body: any){
    return this.httpClient.post<any>(AllUrls.ongoingorder, body);
  }

  getPickupapiCallPickup(params: string){
    return this.httpClient.get<any>(AllUrls.pickup + params );
  }

  getPickupapiCallProduct(params: string){
    return this.httpClient.get<any>(AllUrls.item + params );
  }

  getProBidonInit(params: string){
    return this.httpClient.get<any>(AllUrls.bid + params );
  }

  postProBidacceptBid(body: any){
    return this.httpClient.post<any>(AllUrls.acceptbid, body);
  }

  postProBidpostBid(body: any){
    return this.httpClient.post<any>(AllUrls.bid, body);
  }

  getProductStatsdefaultApiCall(params: string){
    return this.httpClient.get<any>(AllUrls.item + params );
  }

  postverifyLoginCode(body: any){
    return this.httpClient.post<any>(AllUrls.register, body);
  }

  postResendEmailvalidate(body: any){
    return this.httpClient.post<any>(AllUrls.forgotpswrd, body);
  }

  postResetPasswordsubmit(body: any){
    return this.httpClient.post<any>(AllUrls.resetpswrd, body);
  }

  getShipmentsonInit(params: string){
    return this.httpClient.get<any>(AllUrls.shipment + params );
  }


  postSignInsubmitlogin(body: any){
    return this.httpClient.post<any>(AllUrls.loginurl, body);
  }

  getSlidergetproduts(params: string){
    return this.httpClient.get<any>(AllUrls.item + params);
  }

}
