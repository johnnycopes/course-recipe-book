import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onFetchData() {
    this.recipeService.fetchRecipes();
  }

  onSaveData() {
    this.recipeService.saveRecipes().subscribe(
      (response) => console.log(response)
    );
  }
}
