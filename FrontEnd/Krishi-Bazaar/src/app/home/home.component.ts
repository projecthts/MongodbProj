import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FilldbentryService } from '../services/filldbentry.service';
import { CookieService } from 'ngx-cookie-service';
import { AddSliderData, sliderdata } from '../jsonobjectsdata/home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  profile: any;
  error500: Boolean = false;
  //role: string = "";
  // roleFarmer: boolean = false;
  user: any;  
  
  urls = {
    'profile': "http://localhost:5001/v1/users/profile",
  }

  // role: string = "";

  sliderdata: any;
  sliderdatahome: any;

  constructor(private route: ActivatedRoute, private router: Router, private as: AuthService, private fs: FilldbentryService, private cs: CookieService,) { }

  ngOnInit(): void {
    this.sliderdata = AddSliderData;
    this.sliderdatahome = sliderdata;
    this.as.getUser().subscribe(res => {
      this.user = res;
      console.log(res);
      if (res.payload == "Unauthorized") {
        if (this.cs.check('role')) {
          if (this.cs.get('role') != 'newuser') {
            this.cs.delete('role');
            this.cs.set('role', 'newuser', {path: '/'})
          }
        }
        else this.cs.set('role', 'newuser', {path: '/'});
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

  }

  navigate(categ: String) {
    //var myurl = `/items?category=${categ}`;
    this.router.navigate(['/items'], { queryParams: { category: categ } });
  }

  // addtodb() {
  //   for (let dben of this.products) {
  //     this.fs.filldb(dben).subscribe((res) => {

  //     },
  //       (err) => { console.log(err) })
  //   }
  // }

}
