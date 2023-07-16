import { Component, OnInit } from '@angular/core';
import { ThemeSwitchService } from './share/theme-switch/theme-switch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'Drinks UI by @Accepted';

  constructor(public themeSwitchService: ThemeSwitchService) {
  }  
}

