import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { ThemeSwitchComponent } from './share/theme-switch/theme-switch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { ErrorCatchingInterceptor } from './share/interceptors/error-catching.interceptor';
import { CocktailInfoComponent } from './cocktails/cocktail-info/cocktail-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ThemeSwitchComponent,
    CocktailsComponent,
    CocktailInfoComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule,
    MatIconModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, 
    MatToolbarModule, MatProgressSpinnerModule, MatProgressBarModule, MatGridListModule,MatTooltipModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorCatchingInterceptor,
      multi: true,
    }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
