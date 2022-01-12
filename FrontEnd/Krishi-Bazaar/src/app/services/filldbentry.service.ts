import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilldbentryService {

  constructor(private httpClient: HttpClient) { }

  filldb(data: any){
    return this.httpClient.post<any>("https://temp-name-1.herokuapp.com/v1/products/product", data);
  }


}
