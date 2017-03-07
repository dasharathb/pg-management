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

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AllGuest,
    HomePage,
    TabsPage,
    NewGuest,
    LoginPage,
    RegisterPage
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
    RegisterPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, AuthService, GuestService]
})
export class AppModule {}
