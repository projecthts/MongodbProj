import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-logistics',
  templateUrl: './logistics.component.html',
  styleUrls: ['./logistics.component.scss']
})
export class LogisticsComponent implements OnInit {
  title = 'logistics';

  logistic:boolean=false;
  farmer:boolean=false;
  consumer:boolean=true;

  urls = {
    consumers: "https://temp-name-1.herokuapp.com/v1/logistics/orderdetails",
    farmers: "https://temp-name-1.herokuapp.com/v1/logistics/pickup",
    item: "https://temp-name-1.herokuapp.com/v1/products/categories/items/item"
  }

  status = ["Order Placed", "Item Picked", "In Transit", "Out for Delivery", "Delivered"];
  pickedupstatus=["Not Picked","Picked"];
  consumerdetails: any;
  farmerdetails: any;

  consumerheaders = ["Tracking ID", "Product ID", "Product Name", "Product Categories","Quantity", "Date", "Farmer Name", "Pickup Address", "Consumer Name", "Delivery Address","Delivery Person", "Status", "Estimated Date"];
  farmerheaders = ["Request ID", "Product ID", "Product Name", "Product Categories", "Quantity", "Farmer Name", "Pickup Date", "Pickup Address", "Pickup Person", "Status"];

  error500: boolean = false;
  error: boolean = false;
  errormessage: string = "";
  selectedstatus:any;
  selectedpickupstatus:any;
  statuses = [{ "id": "1", "name": "Placed" }, { "id": "2", "name": "Picked" }, { "id": "3", "name": "In Transit" }, { "id": "4", "name": "Out for Delivery" }, { "id": "5", "name": "Delivered" }]
  pickupstatuses=[{"id":"1","name": "Not Picked"},{"id":"2","name": "Picked"}]

  constructor(private fb: FormBuilder, private httpClient: HttpClient,) { }

  consumerForm = this.fb.group({
    trackingId: ['', Validators.required],
    DeliveryBy: ['', Validators.required],
    DeliveryPerson: ['', Validators.required],
    tracking: ['', Validators.required],
    deliveredon: ['', Validators.required],
  })

  farmerForm = this.fb.group({
    ReqId: ['', Validators.required],
    pickupDate: ['', Validators.required],
    ProductId: ['', Validators.required],
    quantity: ['', Validators.required],
    pickupPerson: ['', Validators.required],
    status: ['', Validators.required],
  })

  ngOnInit(): void {

    this.httpClient.get<any>(this.urls.consumers).subscribe(
      (res) => {
        this.consumerdetails = res.payload;
        
        for (let order of this.consumerdetails) {
          this.httpClient.get<any>(this.urls.item + "?id=" + order.productId).subscribe(
            (res) => {
              let item = res.payload;
              order["name"] = item.title;
              order["categories"] = item.categories;
            },
            (err) => {
              console.log(err);
              if (err.status == 0 || err.status == 500) {
                this.error500 = true;
              }
              else {
                this.error = true;
                this.errormessage = "Unable to retreive item. Please contact customer service or try again later.";
              }
            }
          );
        }

        console.log("Consumer details");
        console.log(this.consumerdetails);
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to retreive consumer orders. Please contact customer service or try again later.";
        }
      }
    );

    this.httpClient.get<any>(this.urls.farmers).subscribe(
      (res) => {
        this.farmerdetails = res.payload;

        for (let order of this.farmerdetails) {
          this.httpClient.get<any>(this.urls.item + "?id=" + order.ProductId).subscribe(
            (res) => {
              let item = res.payload;
              order["name"] = item.title;
              order["categories"] = item.categories;
              order["farmername"] = item.sellername;
            },
            (err) => {
              console.log(err);
              if (err.status == 0 || err.status == 500) {
                this.error500 = true;
              }
              else {
                this.error = true;
                this.errormessage = "Unable to retreive item. Please contact customer service or try again later.";
              }
            }
          );
        }

        console.log("Farmer details");
        console.log(this.farmerdetails);
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to retreive consumer orders. Please contact customer service or try again later.";
        }
      }
    );

  }

  date(row: any) {
    return new Date(Number(row.ItemsId.split("?")[1])).toString().split(" ", 4).join(" ");
  }

  pickupdate(row:any){
    return new Date(Number(row.pickupDate)).toString().split(" ", 4).join(" ");
  }

  onClick(id:any) {

    this.logistic = true;
  }

  farmerToggle(val: any) {
    if (this.farmer == true) {
      return;
    }
    this.farmer = !val;
    this.consumer = false;

  }

  consumerToggle(val: any) {
    if (this.consumer == true) {
      return;
    }
    this.consumer = !val;
    this.farmer = false;

  }

  consumerSubmit(){
    this.consumerForm.controls["tracking"].setValue(this.selectedstatus);
    console.log(this.consumerForm.value);
    let data = {
      "trackingId": this.consumerForm.controls["trackingId"].value,
      "tracking": "2"
    }
    // this.consumerForm.value
    this.httpClient.post<any>(this.urls.consumers, this.consumerForm.value).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to retreive consumer orders. Please contact customer service or try again later.";
        }
      }
    );
    
  }

  farmerSubmit(){
    this.farmerForm.controls["status"].setValue(this.selectedpickupstatus);
    console.log(this.farmerForm.value);
    this.httpClient.post<any>(this.urls.farmers, this.farmerForm.value).subscribe(
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to retreive farmer orders. Please contact customer service or try again later.";
        }
      }
    );
    
  }

  num(n:any){
    return Number(n);
  }
}
