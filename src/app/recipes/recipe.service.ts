import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Curry',
      `It's delicious!`,
      'https://upload.wikimedia.org/wikipedia/commons/e/e5/Thai_green_chicken_curry_and_roti.jpg',
      [
        new Ingredient('Chicken', 1),
        new Ingredient('Coconut milk', 2)
      ]
    ),
    // tslint:disable-next-line:max-line-length
    new Recipe(
      'Burger',
      `It's yummy!`,
      'https://www.seriouseats.com/recipes/images/2015/07/20150702-sous-vide-hamburger-anova-primary-1500x1125.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Buns', 2)
      ]
    )
  ];

  constructor() {}

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
