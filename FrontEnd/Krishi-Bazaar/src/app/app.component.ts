import { Component, HostListener, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavigationEnd, NavigationStart, Router, Scroll } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Container, Main } from 'tsparticles';
import { ISourceOptions } from 'tsparticles';
import * as $ from "jquery";
import { debounceTime, filter } from 'rxjs/operators';
import { ViewportScroller } from '@angular/common';
import { Navbar, NavDrawer, dropdown } from './jsonobjectsdata/navigation';
import { CartService } from './services/cart.service';
import { AutoCompleteService } from './services/auto-complete.service';
import { FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


export let browserRefresh = false;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy {
  toggle: Boolean = false;
  id = "tsparticles";
  particlesUrl = "http://foo.bar/particles.json";
  x: boolean = true;
  opened: boolean = false;
  user: any;
  title = 'Krishi-Bazaar';
  error500: boolean = false;
  selectedRole: string = "";
  //consumeron: boolean = false;
  subscription: Subscription;
  //private role = new BehaviorSubject<string>("");
  show: Boolean = false;
  cart: number = 0;
  // acss: any;
  userEmail: any = "New User";
  words: any;
  url: any;
  search: boolean = false;

  constructor(private fb: FormBuilder, private as: AuthService, private router: Router, private cookieService: CookieService, private cs: CartService, private acs: AutoCompleteService) {


    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      };
      this.url = router.url;
      //console.log(this.url);
    });
  }

  // setValuerole(value: any)
  // {
  //   this.role.next(value);
  // }

  // getValuerole(){
  //   return this.role.asObservable();
  // }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  word = new FormControl();

  navdata: any;
  navdrawerdata: any;
  dropdown: any;
  cururl: any;

  ngOnInit(): void {
    (function (d, m) {
      var kommunicateSettings = { "appId": "19d8672dfe4946903ad4557af8f048e6b", "popupWidget": true, "automaticChatOpenOnNavigation": true };
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      (window as any).kommunicate = m; m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});

    // this.cs.setCartToggle();



    this.router.events
      .pipe(filter(routerEvent => routerEvent instanceof NavigationEnd))
      .subscribe(() => {
        $('.mainpage').scrollTop(0);
        this.cururl = this.router.url;
        // window.scrollTo(0, 0)
      });

      // $('.search').on('blur', function(e) {       
        
      //   //console.log($(this).val())
      // })

      this.word.valueChanges.pipe(debounceTime(500)).subscribe(res => {
        // this.search = true;
        console.log(res);
        if(res == '') {this.words = null; return};
        this.acs.getAutoComplete(res).subscribe(res => {
          if(res.payload.length == 0) {this.words = null; return}
          this.words = res.payload;
          console.log(this.words);
        })
      })

    this.dropdown = dropdown;
    this.dropdown[1].func = () => {console.log("Farmer Logout called"); this.logout()};
    this.dropdown[2].func = () => {console.log("Consumer Logout called"); this.logout()};
    this.dropdown[3].func = () => {console.log("Consumer Only Logout called"); this.logout()};

    this.navdata = Navbar;
    this.navdrawerdata = NavDrawer;

    this.navdrawerdata[20].func = () => {console.log("Farmer Logout called"); this.logout()};
    this.navdrawerdata[21].func = () => {console.log("Consumer Logout called"); this.logout()};
    this.navdrawerdata[22].func = () => {console.log("Consumer Only Logout called"); this.logout()};


    if(!this.cookieService.check("role"))
    {
      this.cookieService.set("role", "newuser");
    }

    this.as.setEmailToggle();

    this.as.getEmailToggle().subscribe(res => {
      this.as.getUser().subscribe(res => {

        this.selectedRole = this.cookieService.get('role');
        console.log(this.selectedRole);

        if(this.selectedRole == "farmer" || this.selectedRole == "consumer")
        {
          this.show = true;
        }
        else
        this.show = false;
        if (res.payload != "Unauthorized") {
          this.userEmail = res.payload.email;
        }
        else {
          this.userEmail = "New User";
          this.show = false;
        }
      })
    })

    this.cs.getCartToggle().subscribe(res => {
      this.as.getUser().subscribe(res => {
        if (res.payload == "Unauthorized") {
          this.cart = 0;
        }
        else{
          this.cs.getCart(res.payload.uid).subscribe(res => {
            if (res.payload == undefined) {
              this.cart = 0;
            }
            else this.cart = res.payload.itemsList.length;
          })
        }
      })
    })
  }

  searchsub(cat?: String){
    this.search = false;
    let data = {
      "word": this.word.value.split(" ").join("\n"),
      "displayname": this.word.value
    }
    this.acs.addautocomplete(data).subscribe(res => {});
    if(cat){
      console.log(cat, cat.split(" / ")[cat.split(" / ").length - 1])
      this.router.navigate(["/items"], { queryParams: { category:  cat.split(" / ")[cat.split(" / ").length - 1]}});
      if(this.cururl.split("?")[0] == "/items") setTimeout(() => {location.reload();}, 1000) 
    }
    else{
      this.router.navigate(["/items"], { queryParams: { category:  "nocat/" + this.word.value}});
      if(this.cururl.split("?")[0] == "/items") setTimeout(() => {location.reload();}, 1000) 
    }
    // console.log()
  }

  logout() {
    this.as.logout().subscribe(
      (res) => {
        this.cookieService.delete('role', '/');
        this.cookieService.set("role", "newuser");
        
        this.as.setEmailToggle();

        this.cs.setCartToggle();

        this.router.navigate(['/signin']);
      },
      (err) => {
        console.log(err);
        this.error500 = true;
      }
    )
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    document.getElementsByTagName("canvas")[0].height = window.screen.height;
    //document.getElementsByTagName("canvas")[0].width = window.screen.width;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    if (!(event.target == document.getElementById("udd")) && !(event.target == document.getElementById("ui"))) {
      this.toggle = false;
    }
    if((!(event.target == document.getElementById("search-dd")) && this.search == true) || (event.target == document.getElementById("search-dd")) && this.search == false){
      this.search = !this.search;
    }
  }

  changeroletofarmer() {
    this.cookieService.delete('role');
    this.cookieService.set('role', 'farmer');
    this.as.setEmailToggle();
    this.router.navigate(['/home/farmer']);
  }

  changeroletoconsumer() {
    this.cookieService.delete('role');
    this.cookieService.set('role', 'consumer');
    this.as.setEmailToggle();
    this.router.navigate(['/home']);
  }

  particlesOptions: ISourceOptions = {
    detectRetina: false,
    fpsLimit: 60,
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: true,
          mode: "bubble"
        },
        resize: true
      },
      modes: {
        bubble: {
          distance: 40,
          duration: 2,
          opacity: 8,
          size: 6,
          color: "#00FF00"
          //speed: 3
        }
      }
    },
    particles: {
      color: {
        value: "#000000",
        animation: {
          enable: true,
          speed: 20,
          sync: true
        }
      },
      lineLinked: {
        blink: false,
        color: "random",
        consent: false,
        distance: 30,
        enable: true,
        opacity: 0.3,
        width: 0.5
      },
      move: {
        attract: {
          enable: false,
          rotate: {
            x: 600,
            y: 1200
          }
        },
        bounce: false,
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 1,
        straight: false
      },
      number: {
        density: {
          enable: false,
          area: 2000
        },
        limit: 0,
        value: 200
      },
      opacity: {
        animation: {
          enable: true,
          minimumValue: 0.05,
          speed: 2,
          sync: false
        },
        random: false,
        value: 1
      },
      shape: {
        type: "circle"
      },
      size: {
        animation: {
          enable: false,
          minimumValue: 0.1,
          speed: 40,
          sync: false
        },
        random: true,
        value: 1
      }
    },
    polygon: {
      draw: {
        enable: true,
        lineColor: "rgba(0, 0, 0 ,0.2)",
        lineWidth: 0.3
      },
      move: {
        radius: 10
      },
      inlineArrangement: "equidistant",
      scale: 0.5,
      //type: "inline",
      url: "https://particles.js.org/images/smalldeer.svg"
    }
  };

  tryuser() {
    this.toggle = !this.toggle;
  }

  particlesLoaded(container: Container): void {
    document.getElementsByTagName("canvas")[0].height = window.screen.height;
    document.getElementsByTagName("canvas")[0].width = window.screen.width;
    document.getElementsByTagName("canvas")[0].style.setProperty('height', '100vh');
  }

  particlesInit(main: Main): void {
    console.log(main);
  }

  // ifdropdown(){
  //   if(document.getElementById('search-dd')?.style.display == 'none'){
  //   }
  // }
}
