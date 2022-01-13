import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ExternalLibraryService } from '../utils';
import { CartService } from '../services/cart.service';
import { browserRefresh } from '../app.component';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

declare let Razorpay: any;


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public browserRefresh: boolean = false;
  error500: boolean = false;
  public rzp: any;

  constructor(private router: Router, private zone: NgZone, private cs: CartService, private httpClient: HttpClient,
    private razorpayService: ExternalLibraryService, private cd: ChangeDetectorRef, private as: AuthService,private cs_: CookieService) {

  }

  urls = {
    "ongoingorder": "https://temp-name-1.herokuapp.com/v1/consumer/order"
  };

  //itemsList:any;
  items: any;

  order = {
    "OrderId": "",
    "itemsList": [] as any,
    "deliveryaddress": {},
    "payment": "done",
  };

  error: boolean = false; //added by twinkle
  errormessage: string = "";

  response: any;
  razorpayResponse: any;
  showModal = false;
  user: any = {};
  selectedDeliveryAddress: any;
  cartSubtotal: number = 0;
  itemsInfo: any;

  ngOnInit(): void {

    

    this.browserRefresh = browserRefresh;
    console.log('refreshed?:', browserRefresh);
    if (browserRefresh)
      this.router.navigateByUrl("/cart");

    this.cs.getValuesItemsInfo().subscribe(res => {
      this.itemsInfo = res;
      console.log("Items Info: ", this.itemsInfo);
    })

    this.as.getUser().subscribe(res => {

      if (res.payload == "Unauthorized") {
        this.router.navigate(['/signin']);
      }
      else {
        if(this.cs_.check('role')){
          if(this.cs_.get('role') == 'farmer'){
            this.router.navigate(['/home/farmer']);
          }
    
        }
        this.user = res.payload;
         this.order.OrderId = this.user.uid + "?" + Date.now();
        // console.log(new Date(2021, 1, 21));
        // this.order.OrderId = this.user.uid + "?" + new Date(2021, 2, 26).getTime();
        this.as.getProfile(this.user.uid).subscribe(res => {

          this.RAZORPAY_OPTIONS.prefill.email = this.user.email;
          this.RAZORPAY_OPTIONS.prefill.contact = res.payload.phone;
          this.RAZORPAY_OPTIONS.prefill.name = res.payload.name;
        });

        this.cs.getCart(this.user.uid).subscribe(
          (res) => {
            console.log("payment mein getCart called");
            console.log(res);

            this.items = res.payload.itemsList;


            for (let x of this.items) {
              let temp = {
                "itemId": "", "quantity": 0, "tracking": "1","discount":0, "total": 0,
              };

              temp.quantity = x.quantity;
              temp.itemId = this.order.OrderId + "?" + x.productId;
              
              this.order.itemsList.push(temp);
              for(let i of this.itemsInfo)
              {
                if(i.productid == x.productId)
                {
                  temp.discount = i.discount;
                  temp.total = i.total;
                }
              }
            }
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

    });



    this.razorpayService
      .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe();

    this.cs.getValueSDA().subscribe(res => {
      this.selectedDeliveryAddress = res;
    })

    this.cs.getValueSubtotal().subscribe(res => {
      this.cartSubtotal = res;
      console.log("Order Summary Subtotal: ", this.cartSubtotal);
    })

  }


  RAZORPAY_OPTIONS = {
    "key": "rzp_test_uyT8kTeKSmlT7y",
    "amount": "10000",
    "name": "Krishi Bazaar",
    "order_id": "",
    "description": "Fresh from the Farm to your Doorstep",
    "image": "https://firebasestorage.googleapis.com/v0/b/krishibazaar-14ac4.appspot.com/o/RzpLogo.png?alt=media&token=158c43c9-b418-4f33-b90a-4fc4a267abe5",
    "prefill": {
      "name": "Test Name",
      "email": "Test email",
      "contact": "Test number",
      "method": ""
    },
    "handler": {},
    "modal": {},
    "theme": {
      "color": "#386a56"
    }
  };


  public proceed() {
    this.RAZORPAY_OPTIONS.amount = (this.cartSubtotal * 100) + '';
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);

    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS)
    razorpay.open();
  }

  public razorPaySuccessHandler(response: any) {
    console.log(response);
    this.razorpayResponse = `Successful Transaction`;
    console.log(this.razorpayResponse);
    delete this.selectedDeliveryAddress['addresstitle'];
    this.order.deliveryaddress = this.selectedDeliveryAddress;

    this.httpClient.post<any>(this.urls.ongoingorder, this.order).subscribe(
      (res) => {
        console.log(res.message);
        console.log(this.order);
        this.cs.setCartToggle();
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
          console.log("Error");
        }
        else {
          this.error = true;
          this.errormessage = "Unable to add items. Please contact customer service or try again later."
        }
      }
    );

    this.zone.run(() => {
      this.router.navigateByUrl("/orders");
    });

  }


}
