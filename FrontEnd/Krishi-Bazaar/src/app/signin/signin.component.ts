import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,Validators,AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from '../app.component';
import { logindata, regdata } from '../jsonobjectsdata/signin';
import { WindowService } from '../window.service';
import firebase from 'firebase/app';
import 'firebase/auth'
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  authError: any;
  user: any;
  signindata: any;
  signupdata: any;
  error500: boolean = false;

  url = "http://localhost:5001/v1/users/login";

  urls = {
    'register': "http://localhost:5001/v1/users/registration",
    'state': "http://localhost:5001/v1/location/states",
    'district': "http://localhost:5001/v1/location/states/districts"
  }


  error: boolean = false;
  email: boolean = false;
  messageemail: string = "";
  password: boolean = false;
  messagepassword: string = "";
  errormessage: string = "";

  resendemail: boolean = false;

  login: boolean = true;

  selectedRole: String = "farmer";
  selectedState: String = "";
  selectedDistrict: String = "";
  windowRef: any;

  name: boolean = false;
  messagename: string = "";

  phone: boolean = false;
  messagephone: string = "";

  confirmpassword: boolean = false;
  messageconfirmpassword: string = "";
  address: boolean = false;
  messageaddress: string = "";
  district: boolean = false;
  messagedistrict: string = "";
  state: boolean = false;
  messagestate: string = "";
  pincode: boolean = false;
  messagepincode: string = "";

  phoneVerified: boolean = false;
  verificationCode: string = "";
  phuser: any;


  states: any;
  districts: any;
  constructor(private router: Router, private httpClient: HttpClient, private cartser: CartService,
    private as: AuthService, private cs: CookieService, private ac: AppComponent, private win: WindowService, private ath: AngularFireAuth) { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha',
    //     {
    //       'size': 'invisible'
    //     }
    //   );

    //   this.windowRef.recaptchaVerifier.render().then((widgetId: any) => {
    //     this.windowRef.recaptchaWidgetId = widgetId;
    //   });
    // }, 2000);
    this.as.getUser().subscribe(res => {
      this.user = res.payload;
      console.log(this.user);
      console.log(res);
      
      if (res.payload != "Unauthorized") {
        if (this.cs.check('role')) {
          if (this.cs.get('role') == 'farmer') {
            this.router.navigate(['/home/farmer']);
          }

          if (this.cs.get('role') == 'consumer') {
            this.router.navigate(['/home']);
          }

          if (this.cs.get('role') == 'consumeronly') {
            this.router.navigate(['/home']);
          }
        }
      }
    })
    this.signindata = logindata;
    this.signupdata = regdata;
    this.signupdata[8].click = (state: string) => { this.getDistricts(state) };
    this.getStates();

    this.phoneVerified = false;
    this.resendemail = false;
    this.error500 = false;
    this.error = false;
    this.windowRef = this.win.windowRef;
   
    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha',
    //   {
    //     'size': 'invisible'
    //   }
    // );

    // this.windowRef.recaptchaVerifier.render().then((widgetId: any) => {
    //   this.windowRef.recaptchaWidgetId = widgetId;
    // });
  }

  formlog(name: string) {
    return this.formlogin.get(name)!;
  }
  formregget(name: string) {
    return this.formreg.get(name)!;
  }

  formlogin = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
      ),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  formreg = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
      ),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('[2-9]{2}\\d{8}'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
      ),
    ]),
    role: new FormControl('farmer',[Validators.required]),
    confirmpassword: new FormControl('', [Validators.required]),
    address: new FormControl('',[Validators.required]),
    district: new FormControl(''),
    state: new FormControl(''),
    pincode: new FormControl('',[Validators.required]),
  }, { validators: this.checkPasswords })

  phoneotp = new FormGroup({
    code: new FormControl(''),
  })

  validatelogin() {



    if (!this.formlogin.invalid) {
      console.log("success");
      this.submitlogin();
    }
  }

  validatereg() {
    console.log(this.formreg.valid);
    if (!this.formreg.invalid) {
      console.log("success");
      return true;
    }

    else {
      return false;
    }

  }

  resendmail() {
    this.router.navigate(['/resendemail']);
  }

  move() {
    this.login = !this.login;
  }

  getStates() {
    this.httpClient.get<any>(this.urls.state).subscribe(
      (res) => {
        console.log(res);
        this.states = res.payload;
        for (let x of res.payload) {
          this.signupdata[8].options.push({ "value": x.name, "placeholder": x.name });
        }
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to register. Please contact customer service or try again later.";
        }
      }
    );
  }

  getDistricts(state: String) {
    console.log(state);
    this.httpClient.get<any>(this.urls.district + "?state=" + state).subscribe(
      (res) => {
        console.log(res);
        this.signupdata[9].options = [];
        this.districts = res.payload.districts;
        for (let x of res.payload.districts) {
          this.signupdata[9].options.push({ "name": x, "placeholder": x });
        }

      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to register. Please contact customer service or try again later.";
        }
      }
    );
  }

  // sendLoginCode() {

  //   const appVerifier = this.windowRef.recaptchaVerifier;

  //   const num = "+91" + this.formreg.get("phone")?.value;

  //   firebase.auth().signInWithPhoneNumber(num, appVerifier)
  //     .then(result => {

  //       this.windowRef.confirmationResult = result;

  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.error = true;
  //       this.errormessage = "Cannot send verification code. Please try again later.";
  //     });

  // }

  submitreg() {

    if (!this.validatereg()) return;
    let data = this.formreg.value;
          delete data.confirmpassword;
          data.role = this.signupdata[5].value; //selectedRole
          data.state = this.signupdata[8].value;
          data.district = this.signupdata[9].value;

          console.log(data);
          this.httpClient.post<any>(this.urls.register, data).subscribe(
            (res) => {
              console.log(res.message);
              if (res.statusCode != 0) {
                this.error = true;
                this.errormessage = res.message;
                if (this.errormessage == "Please verify email") this.resendemail = true;
              }
              else {
                this.login = true;
              }

            },
            (err) => {
              console.log(err);
              if (err.status == 0 || err.status == 500) {
                this.error500 = true;
              }
              else {
                this.error = true;
                this.errormessage = "Unable to register. Please contact customer service or try again later.";
              }
            }
          );

  }

  // returnConfirmationCode = (): Promise<firebase.auth.UserCredential> => {
  //   console.log(this.phoneotp.get("code")?.value);
  //   return this.windowRef.confirmationResult.confirm(this.phoneotp.get("code")?.value.toString());
  // }

  // verifyLoginCode() {
  //   this.returnConfirmationCode()
  //     .then(result => {

  //       this.phuser = result.user;
  //       firebase.auth().currentUser?.delete().then(val => {
  //         this.phoneVerified = true;
  //         let data = this.formreg.value;
  //         delete data.confirmpassword;
  //         data.role = this.selectedRole; //selectedRole
  //         data.state = this.selectedState;
  //         data.district = this.selectedDistrict;

  //         this.httpClient.post<any>(this.urls.register, data).subscribe(
  //           (res) => {
  //             console.log(res.message);
  //             if (res.statusCode != 0) {
  //               this.error = true;
  //               this.errormessage = res.message;
  //               if (this.errormessage == "Please verify email") this.resendemail = true;
  //             }
  //             else {
  //               this.router.navigate(['/signin']);
  //             }

  //           },
  //           (err) => {
  //             console.log(err);
  //             if (err.status == 0 || err.status == 500) {
  //               this.error500 = true;
  //             }
  //             else {
  //               this.error = true;
  //               this.errormessage = "Unable to register. Please contact customer service or try again later.";
  //             }
  //           }
  //         );

  //       })
  //         .catch(e => {
  //           this.error = true;
  //           this.errormessage = "Unable to register. Please try again later.";
  //         })

  //     })
  //     .catch(error => {
  //       console.log(error, "Incorrect code entered?")
  //       this.error = true;
  //       this.errormessage = "Incorrect code or code expired. Please try again"
  //     });
  // }

  submitlogin() {
    let data = this.formlogin.value;
    this.formlogin.get('email')?.setValue('');
    this.formlogin.get('password')?.setValue('');
    this.httpClient.post<any>(this.url, data, { withCredentials: true }).subscribe(
      (res) => {
        if (res.statusCode == 0) {
          // this.cs.set('connect.sid', res.payload.sessionID);
          this.as.getUser().subscribe(res => {
            if (res.payload == "Unauthorized") {
              this.router.navigate(['/401']);
            }
            this.as.getProfile(res.payload.uid).subscribe(
              res2 => {
                this.cartser.setCartToggle();
                if (res2.payload.role == "farmer") {
                  this.cs.delete("role");
                  this.cs.set('role', 'farmer');
                  this.as.setEmailToggle();

                  this.router.navigate(['/home/farmer']);
                }
                else {
                  this.cs.delete("role");
                  this.cs.set('role', 'consumeronly');
                  this.as.setEmailToggle();
                  this.router.navigate(['/home']);
                }
              }
            )

          })
        }
        else {
          this.error = true;
          this.errormessage = res.message;
          if (this.errormessage == "Please verify email") this.resendemail = true;
        }
      },
      (err) => {
        console.log(err);
        if (err.status == 0 || err.status == 500) {
          this.error500 = true;
        }
        else {
          this.error = true;
          this.errormessage = "Unable to register. Please contact customer service or try again later."
        }
      }
    );

  }
  checkPasswords(group: AbstractControl) {
    // here we have the 'passwords' group
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmpassword')?.value;

    console.log(pass, confirmPass, pass == confirmPass);
    return pass === confirmPass ? null : { notSame: true };
  }
}
