import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { Drink, Ingredient, Ingredients } from 'src/app/share/api/model';
import { CocktailsdbService } from 'src/app/share/services/cocktailsdb.service';
import { ThemeSwitchService } from 'src/app/share/theme-switch/theme-switch.service';

@Component({
  selector: 'app-cocktail-info',
  templateUrl: './cocktail-info.component.html',
  styleUrls: ['./cocktail-info.component.scss']
})
export class CocktailInfoComponent implements OnInit {

  public drink!: Drink;
  public ingredientAndMeasures: string[] = [];
  public ingerdients: Ingredient[] =[];

  constructor(private activRoute: ActivatedRoute, private cocktailsdbService: CocktailsdbService, public themeService: ThemeSwitchService) { }

  ngOnInit(): void {
    
    this.activRoute.params
    .subscribe(params => {
      this.cocktailsdbService.getDrinksById(params['id'])
      .subscribe(resp => {
          this.drink = resp.drinks[0];
          this.loadIngredients(this.drink);
        });
        
      });
    }


  private loadIngredients(drink: Drink){
    this.ingredientAndMeasures = [];
    const ingrdntReq$ : Observable<Ingredients>[] = [];
    const ingrdntReqAll$ : Observable<Ingredients>[] = [];
   
    (Object.keys(drink) as (keyof typeof drink)[]).forEach((key, index) => {
        if (key.startsWith('strIngredient') && drink[key]){
          const num: string = 'strMeasure' + key.replace('strIngredient', '') 
          const ingrd: string = drink[key] +'';
          const meas: string = drink[num as (keyof typeof drink)] +'';
          
          this.ingredientAndMeasures.push(ingrd + (meas ? ' (' + meas + ')' : ''));
          if (ingrdntReq$.length<6){
            ingrdntReq$.push(this.cocktailsdbService.getIngredientByName(ingrd)); 
          }
          ingrdntReqAll$.push(this.cocktailsdbService.getIngredientByName(ingrd)); 
        } 
    });

    this.combineLatestNoLimit(ingrdntReqAll$).subscribe(result => {
      this.ingerdients = result.map(ing => ing.ingredients[0]);
    })

  }


  /**
   * Method to bypass the limit of 6 Observables per combineLatest
   * A drink may have 15 ingredients.
   * @param args 
   * @returns Observable<Ingredients[]>
   */
  private combineLatestNoLimit(args: Observable<Ingredients>[]): Observable<Ingredients[]> {
    const limit = 6;
    const length = parseInt((args.length / limit) + '') + 1;
    return combineLatest(
      Array.from({ length })
        .map((_, i)=> args.slice(i * limit, (i + 1) * limit))
        .map(arr => combineLatest(arr))
      )
      .pipe(map(combined => combined.flat()));
  }

}
