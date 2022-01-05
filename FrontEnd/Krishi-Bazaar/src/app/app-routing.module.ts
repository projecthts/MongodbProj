import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PhoneVerComponent } from './phone-ver/phone-ver.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailverificationComponent } from './emailverification/emailverification.component';
import { Error401Component } from './error401/error401.component';
import { Error500Component } from './error500/error500.component';
import { ResendemailComponent } from './resendemail/resendemail.component';
import { AddItemsComponent} from './add-items/add-items.component';
// import { ConsumerHomepageComponent} from './consumer-homepage/consumer-homepage.component';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './item/item.component';
import { CartComponent } from './cart/cart.component';
import { AddressComponent } from './address/address.component';
import { OrdersComponent } from './orders/orders.component';
import { FarmerHomeComponent } from './farmer-home/farmer-home.component';
import { PickupComponent } from './pickup/pickup.component';
import {PaymentComponent} from './payment/payment.component';
import { ShipmentsComponent } from './shipments/shipments.component';
import { ProductsStatisticsComponent } from './products-statistics/products-statistics.component';
import { SigninComponent } from './signin/signin.component';
import { AidComponent } from './aid/aid.component';
import { ProdbidComponent } from './prodbid/prodbid.component';
import { ConsumerBidComponent } from './consumer-bid/consumer-bid.component';
import { FarmerBidComponent } from './farmer-bid/farmer-bid.component';
import { CompanystatsComponent } from './companystats/companystats.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  // {
  //   path: 'consumer-homepage',
  //   component: ConsumerHomepageComponent
  // },
  {
    path: 'add-items',
    component: AddItemsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },

  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent
  },

  {
    path: 'verifyemail',
    component: EmailverificationComponent
  },

  {
    path: 'resendemail',
    component: ResendemailComponent
  },

  {
    path: '401',
    component: Error401Component
  },

  {
    path: '500',
    component: Error500Component
  },

  {
    path: 'items',
    component:  ItemsComponent
  },

  {
    path: 'item',
    component:  ItemComponent
  },

  {
    path: 'cart',
    component:  CartComponent
  },

  {
    path: 'address',
    component:  AddressComponent
  },

  {
    path: 'orders',
    component:  OrdersComponent
  },

  {
    path: 'home/farmer',
    component: FarmerHomeComponent
  },

  {
    path: 'pickup',
    component: PickupComponent
  },

  {
    path: 'payment',
    component: PaymentComponent
  },

  {
    path: 'shipment',
    component: ShipmentsComponent
  },

  {
    path: 'productstats',
    component: ProductsStatisticsComponent
  },

  {
    path: 'signin',
    component: SigninComponent
  },

  {
    path: 'aid',
    component: AidComponent
  },

  {
    path: 'farmerbid',
    component: FarmerBidComponent
  },

  {
    path: 'consumerbid',
    component: ConsumerBidComponent
  },

  {
    path: 'productbid',
    component: ProdbidComponent
  },

  {
    path: 'companystats',
    component: CompanystatsComponent
  },

  {
    path: 'test',
    component: TestComponent
  },

  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollOffset: [0, 0], scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
