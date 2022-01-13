import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { dailyVegetables, exotic, exoticVegetables, fruits, herbsandseasoning, organic } from '../assets/data';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})

export class ItemsComponent implements OnInit {

  categoryValue: any = [];
  categories: Node[] = [];
  cat: string = "";
  error500: boolean = false;
  items: any[] = [];
  titlecat: string = "";
  catArray: string[] = [];
  user: any;
  generatejson: any[] = [];
  urls = {
    'filter': "http://localhost:5001/v1/products/categories/items/filteritems",
    'default': "http://localhost:5001/v1/products/categories/items/items",
  };

  errormessage: string = "";
  error: boolean = false;
  rating = 3.5;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router, private as: AuthService, private cs: CookieService) {
  }


  ngOnInit(): void {
    this.catArray = [];
    this.categories = this.init(null);
    this.as.getUser().subscribe(res => {
      this.user = res;
      // console.log(this.user);
      // console.log(res);
      if (res.payload == "Unauthorized") {
        if (this.cs.check('role')) {
          if (this.cs.get('role') != 'newuser') {
            this.cs.delete('role');
            this.cs.set('role', 'newuser')
          }
        }
        else this.cs.set('role', 'newuser');
      }

      else {
        if (this.cs.check('role')) {
          if (this.cs.get('role') == 'farmer') {
            this.router.navigate(['/home/farmer']);
          }
        }
      }
    },
      (err) => {
        if (err.status == 0 || err.status == 500) this.error500 = true;
      })

    this.cat = this.route.snapshot.queryParams['category']
    if(this.cat != undefined && this.cat.split('/')[0] != "nocat"){
      for(let x of this.categories){
        if(x.name != this.cat) this.searchchildren(x);
        else this.addinchildren(x);
      }
      this.apiCall();
    }
    else if(this.cat != undefined && this.cat.split('/')[0] == "nocat"){
      this.searchApiCall(this.cat.split('/')[1]);
    }
    else this.defaultApiCall();
  }

  addinchildren(node: Node){
    if(node.children.length){
      for(let i of node.children) this.addinchildren(i);
    }
    else{
      this.catArray.push(node.id);
    }
  }

  searchchildren(node: Node){
    if(node.children.length){
      for(let i of node.children){
        
        if(i.name == this.cat) {this.addinchildren(i); return}
        else{
          if(i.children.length)
          for(let j of i.children)
          if(j.name == this.cat) {this.addinchildren(j); return}
        }
      }
    }
  }

  defaultApiCall() {
    this.httpClient.get<any>(this.urls.default + "?id=" + this.cat).subscribe(
      (res) => {
        this.items = res.payload;
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to retrieve items. Please contact customer service or try again later.";
        }
      }
    );
  }

  searchApiCall(keyword: string){
    // console.log(keyword, "ke");
    this.httpClient.get<any>(this.urls.filter + "?type=nocat&kw=" + keyword).subscribe(res => {
      console.log(res);
      this.items = res.payload;
    })
  }
  
  apiCall() {
    if (this.catArray.length === 0) {
      this.defaultApiCall();
    }
    else {
      let str: string = "";
      for (var i of this.catArray) {
        str = str + "&id=" + i;
      }
      this.httpClient.get<any>(this.urls.filter + "?" + str.slice(1)).subscribe(
        (res) => {
          // console.log(res.message);
          this.items = res.payload;
          // this.catArray = [];
          // console.log(this.items);
        },
        (err) => {
          console.log(err);
          if (err.status == 0 || err.status == 500) {
            this.error500 = true;
          }
          else {
            this.error = true;
            this.errormessage = "Unable to retrieve items. Please contact customer service or try again later.";
          }
        }
      );
    }
  }

  gotoItem(item: any) {
    this.router.navigate(['/item'], { queryParams: { id: item._id } });
  }

  toggleallchildrenx(node: Node, check: "unchecked" | "checked" | "partial"){
    node.evalcheck = check;
    if (node.children.length) {
      for (let i of node.children) {
        this.toggleallchildrenx(i, check);
      }
    }
    else {
      if (node.evalcheck == "unchecked") {
        let index = this.catArray.indexOf(node.id);
        this.catArray.splice(index, 1);
      }
      else {
        this.catArray.push(node.id);
        // console.log("Hi", this.catArray)
      }
    }
  }

  checkcondition(node: Node){
    let check = 0;
    for(let i of node.children){
      if(i.evalcheck == "checked") check += 1;
      else if(i.evalcheck == "unchecked") check -= 1;
    }

    if(check == node.children.length) return "checked";
    else if (check * -1 == node.children.length) return "unchecked";
    else return "partial";
  }

  toggleallparents(node: Node){
    if(node.parent){
      node.parent.evalcheck = this.checkcondition(node.parent);
      this.toggleallparents(node.parent);
    }
  }

  onClickx(node: Node){
    if(node.evalcheck == "checked") node.evalcheck = "unchecked";
    else node.evalcheck = "checked";
    this.toggleallchildrenx(node, node.evalcheck)
    if(node.parent){
      this.toggleallparents(node);
    }
  }


  initData = [
    { name: 'Fruits', children: fruits },
    { name: 'Daily Vegetables', children: dailyVegetables },
    { name: 'Exotic Vegetables', children: exoticVegetables },
    { name: 'Organic', children: organic },
    { name: 'Exotic', children: exotic },
    { name: 'Herbs and Seasoning', children: herbsandseasoning }
  ]

  init(parent: Node | null, initData?: any[]): Node[] {

    if (!initData) {
      initData = this.initData
    }

    let retVal: Node[] = [];

    initData.forEach((each) => {
      let data = new Node(each.name, each.id, parent);
      if (each.children && (each.children.length > 0)) {
        data.children = this.init(data, each.children);
      }

      retVal.push(data);

    });

    return retVal;
  }


}

class Node {

  checked: boolean = false;
  expanded: boolean = false;
  children: Node[] = [];
  //parent: Node | null = null;
  checkval: "unchecked" | "checked" | "partial" = "unchecked";
  evalcheck: "unchecked" | "checked" | "partial" = "unchecked";
  constructor(public name: string, public id: string, public parent: Node | null) { }

  clicked() {
    if (this.children.length) {
      this.expanded = !this.expanded;
    }
  }

  getClass(): string {
    let retVal = '';
    if (this.children.length) {
      retVal = this.expanded ? 'fa fa-minus-circle' : 'fa fa-plus-circle';
    }
    return retVal;
  }
}
