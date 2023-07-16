import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {

  public isDarkTheme!: boolean;

  constructor() {
    this.setTheme();
  }

  public setTheme(): void{
    if (localStorage.getItem('isDarkTheme')) {
      const isDarkTheme = localStorage.getItem('isDarkTheme') === "true"
      this.isDarkTheme = isDarkTheme;
    }
  }



}
