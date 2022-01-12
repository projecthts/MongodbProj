import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  constructor(private httpClient: HttpClient) { }

  getAutoComplete(str: string){
    return this.httpClient.get<any>("https://temp-name-1.herokuapp.com/v1/autocomplete/autocomplete?word=" + str);
  }

  addautocomplete(data: any){
    return this.httpClient.post<any>("https://temp-name-1.herokuapp.com/v1/autocomplete/addautocomplete", data);
  }
}
