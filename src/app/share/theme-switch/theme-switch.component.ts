import { Component, OnInit } from '@angular/core';
import { ThemeSwitchService } from './theme-switch.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent{

  constructor(public themeSwitchService: ThemeSwitchService) { }

  toggleTheme(): void {
    const isDarkTheme = !this.themeSwitchService.isDarkTheme;
    localStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme));
    this.themeSwitchService.isDarkTheme = isDarkTheme;
  }



}
