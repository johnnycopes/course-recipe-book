import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private readonly recipeUrl = 'https://max-recipe-book-104b7.firebaseio.com/recipes.json';
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

  constructor(private http: HttpClient) { }

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

  fetchRecipes() {
    this.http.get<Recipe[]>(this.recipeUrl)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(
        (recipes) => {
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes.slice());
          console.log('fetch');
        }
      );
  }

  saveRecipes() {
    return this.http.put<Recipe[]>(this.recipeUrl, this.recipes)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}
