import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  constructor(private router: Router, private httpClient: HttpClient) { }

  products: any[] = [];
  urls = {
    'product': "http://localhost:5001/v1/products/categories/items/item",
  };

  ngOnInit(): void {
    if(this.type == 'prod'){
      for(let [index, x] of this.data.entries()){
        this.products.push(this.data[index])
        this.products[this.products.length - 1]["product"] = {};
        this.getproduts(x.link, index);
      }
    }

    else{
      this.products = this.data;
    }
  }

  @Input() type: string = "";
  @Input() id: string = "";
  @Input() data: any[] = [];

  navigate(categ: String) {
    //var myurl = `/items?category=${categ}`;
    this.router.navigate(['/items'], { queryParams: { category: categ } });
  }

  navigateprod(categ: String) {
    //var myurl = `/items?category=${categ}`;
    this.router.navigate(['/item'], { queryParams: { id: categ } });
  }

  scrollright(){
    const bla = document.getElementById(this.id)
      $("#" + this.id).animate({
        scrollLeft: bla!.scrollLeft + (window.innerWidth * (70/100))
      }, 800, function(){});
  }

  
  scrollleft(){
    const bla = document.getElementById(this.id)
      $("#" + this.id).animate({
        scrollLeft: bla!.scrollLeft - (window.innerWidth * (70/100))
      }, 800, function(){});
  }

  getproduts(id: string, ind: number){
    this.httpClient.get<any>(this.urls.product + "?id=" + id).subscribe(
      (res) => {
        this.products[ind]["product"] = res.payload;
        // console.log(ind, this.data[ind]["product"])
      },
      // (err) => {
      //   console.log(err);
      //   if (err.status == 0 || err.status == 500) {
      //     this.error500 = true;
      //   }
      //   else {
      //     this.error = true;
      //     this.errormessage = "Unable to retreive item. Please contact customer service or try again later.";
      //   }
      // }
    );
  }
}
