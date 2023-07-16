import { Component, OnInit } from '@angular/core';
import { CocktailsdbService } from '../share/services/cocktailsdb.service';
import { Categories, Drink, Drinks } from '../share/api/model';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemeSwitchService } from '../share/theme-switch/theme-switch.service';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.scss']
})
export class CocktailsComponent implements OnInit {
  public drinksForm!: FormGroup;
  public drinkCats!: string[];
  public drinks!: Drink[];

  constructor(public cocktailsdbService: CocktailsdbService, private fb: FormBuilder, public themeService: ThemeSwitchService) { }

  ngOnInit(): void {
    // populate the categories menu
    this.cocktailsdbService.getCategories()
    .pipe(
      filter(cats => !!cats.drinks)
    ).subscribe((cats: Categories) => {
      this.drinkCats = cats.drinks.map(cat => cat.strCategory);
      this.cocktailsdbService.apiLoading = false;
    });
    // search with an empty string to get all drinks (however api limit is 25 items)
    this.seacrhDrinkByName('');
    // build the form
    this.drinksForm = this.fb.group({
      searchStr: [''],
      catSelect:['']

    })
    // on value changes search control
    this.drinksForm.controls['searchStr'].valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(str => {
      this.drinksForm.controls['catSelect'].setValue(null, { emitEvent: false });
      this.seacrhDrinkByName(str);
    });
    // on value changes category filter control
    this.drinksForm.controls['catSelect'].valueChanges.pipe(
    ).subscribe(str => {
      this.drinksForm.controls['searchStr'].setValue(null,{ emitEvent: false });
      this.seacrhDrinkByCat(str);
    });
  }
  

  public seacrhDrinkByName(searchStr: string): void{
    this.cocktailsdbService.getDrinksByName(searchStr).subscribe((drnks: Drinks) => {
      this.drinks = drnks.drinks;
      this.cocktailsdbService.apiLoading = false;
    });
  }


  public seacrhDrinkByCat(cat: string): void{
    this.cocktailsdbService.getDrinksByCategory(cat).subscribe((drnks: Drinks) => {
      this.drinks = drnks.drinks;
      this.cocktailsdbService.apiLoading = false;
    });
  }



}
