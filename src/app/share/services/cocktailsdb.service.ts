import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories, Drinks, Ingredients } from '../api/model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CocktailsdbService {

  public apiError!: string | null;
  public apiLoading: boolean = false;

  private searchDrinkByName: string = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  private drinkCategoriesUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  private searchDrinkByCat: string = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
  private searchDrinkById: string = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
  private searchIngredientByName ='https://www.thecocktaildb.com/api/json/v1/1/search.php?i='

  constructor(private httpClient: HttpClient ) { }

  public getCategories(): Observable<Categories>{
    return this.httpClient.get<Categories>(this.drinkCategoriesUrl);
  } 

  public getDrinksByName(searchStr: string): Observable<Drinks>{
    return this.httpClient.get<Drinks>(this.searchDrinkByName + searchStr);
  } 

  public getDrinksByCategory(cat: string): Observable<Drinks>{
    return this.httpClient.get<Drinks>(this.searchDrinkByCat + cat);
  } 

  public getDrinksById(id: string): Observable<Drinks>{
    return this.httpClient.get<Drinks>(this.searchDrinkById + id);
  } 

  public getIngredientByName(name: string): Observable<Ingredients>{
    return this.httpClient.get<Ingredients>(this.searchIngredientByName + name);
  } 

}
