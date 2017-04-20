import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { AllGuest } from '../pages/allguest/allguest';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {NewGuest} from '../pages/newguest/newG';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { GuestService } from '../providers/guest-service';
import { RegisterPage } from '../pages/register/register';
import { InOut } from '../pages/inout/inout';
import { Guest } from '../pages/guest-info/guest';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AllGuest,
    HomePage,
    TabsPage,
    NewGuest,
    LoginPage,
    RegisterPage,
    InOut,
    Guest
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AllGuest,
    HomePage,
    TabsPage,
    NewGuest,
    LoginPage,
    RegisterPage,
    InOut,
    Guest
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, GuestService]
})
export class AppModule {}
