import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-companystats',
  templateUrl: './companystats.component.html',
  styleUrls: ['./companystats.component.scss']
})
export class CompanystatsComponent implements OnInit {

  urls = {
    "orders": "https://temp-name-1.herokuapp.com/v1/consumer/orders",
    'item': "https://temp-name-1.herokuapp.com/v1/products/categories/items/item",
    "stats": "https://temp-name-1.herokuapp.com/v1/companystats",
  };

  error500: boolean = false;
  error: boolean = false;
  errormessage: string = "";

  public doughnutChartLabels_f : string[] = [];
  public doughnutChartData_f:number[] = [];
  public doughnutChartType_f: any = 'doughnut';
  public doughnutChartColor : Color[] = [
    { backgroundColor: ["rgb(60, 179, 113)",'rgb(255,153,204)','rgb(225,225,153)','rgb(135, 158, 232)','rgb(225,153,153)',] }
  ]

  public polarChartColor : Color[] = [
    { backgroundColor: ["rgba(60, 179, 113,0.6)",'rgba(255,153,204,0.6)','rgba(225,225,153,0.6)','rgba(135, 158, 255,0.6)',
                        'rgba(225,153,153,0.6)',] }
  ]

  public pieChartLabels : string[] = [];
  public pieChartData :number[] = [];
  public pieChartType: any = 'pie';
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels :string[] = [];
  public barChartType: any = 'bar';
  public barChartLegend = true;
  public barChartData:any[] = 
   [
    {data: [null], label: 'Market Rate'}
  ];


  public polarAreaChartLabels : string[] = [];
  public polarAreaChartData:number[] = [];
  public polarAreaLegend = true;
  public polarAreaChartType: any = 'polarArea';
  

  constructor(private httpClient: HttpClient, private router: Router, 
    private as: AuthService, private cs: CartService,private cs_: CookieService) { }

  ngOnInit(): void {

    this.httpClient.get<any>(this.urls.stats + "?type=1").subscribe(
      (res) => {
        console.log(res.payload);
        for(let x in res.payload){
          this.doughnutChartLabels_f.push(x);
          this.doughnutChartData_f.push(Number(res.payload[x]));
        }
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable get stats 1. Please contact customer service or try again later.";
        }
      }
    );


    this.httpClient.get<any>(this.urls.stats + "?type=2").subscribe(
      (res) => {
        console.log(res.payload);
        this.barChartData[0]['data'] = [];
        for(let x in res.payload){
          this.barChartLabels.push(x);
          this.barChartData[0]["data"].push(res.payload[x]);
        }
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable get stats 2. Please contact customer service or try again later.";
        }
      }
    );

    this.httpClient.get<any>(this.urls.stats + "?type=3").subscribe(
      (res) => {
        console.log(res.payload);
        for(let x in res.payload){
          this.polarAreaChartLabels.push(x);
          this.polarAreaChartData.push(Number(res.payload[x]));
        }
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable get stats 3. Please contact customer service or try again later.";
        }
      }
    );

    this.httpClient.get<any>(this.urls.stats + "?type=4").subscribe(
      (res) => {
        console.log(res.payload);
        for(let x in res.payload){
          this.pieChartLabels.push(x);
          this.pieChartData.push(Number(res.payload[x]));
        }
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable get stats 4. Please contact customer service or try again later.";
        }
      }
    );

  }

}
