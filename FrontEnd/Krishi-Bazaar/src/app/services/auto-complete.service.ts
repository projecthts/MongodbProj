import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  constructor(private httpClient: HttpClient) { }

  getAutoComplete(str: string){
    return this.httpClient.get<any>("http://localhost:5001/v1/autocomplete/autocomplete?word=" + str);
  }

  addautocomplete(data: any){
    return this.httpClient.post<any>("http://localhost:5001/v1/autocomplete/addautocomplete", data);
  }
}
