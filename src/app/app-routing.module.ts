import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailInfoComponent } from './cocktails/cocktail-info/cocktail-info.component';
import { CocktailsComponent } from './cocktails/cocktails.component';


const routes: Routes = [
  { path: '', redirectTo: 'cocktails', pathMatch: 'full' },
  { path: 'cocktails', component: CocktailsComponent },
  { path: 'cocktail/:id', component: CocktailInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
