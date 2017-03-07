import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { AllGuest } from '../allguest/allguest';
import {NewGuest} from '../newguest/newG';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tabNewG: any = NewGuest;
  tab2Root: any = AboutPage;
  tab3Root: any = AllGuest;

  constructor() {

  }
}
