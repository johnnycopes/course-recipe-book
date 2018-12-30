import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Curry', `It's delicious!`, 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Thai_green_chicken_curry_and_roti.jpg'),
    // tslint:disable-next-line:max-line-length
    new Recipe('Burger', `It's yummy!`, 'https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary-1500x1125.jpg')
  ];
  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit() {
  }

  onSelectRecipe(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }

}
