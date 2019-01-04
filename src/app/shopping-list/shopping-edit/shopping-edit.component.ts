import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientForm') ingredientForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editMode = true;
          this.editedItemIndex = index;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.ingredientForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }

  onSubmit() {
    const { name, amount } = this.ingredientForm.value;
    const ingredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredients([ingredient]);
    }
    this.resetForm();
  }

  onDeleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.resetForm();
  }

  onClearIngredient() {
    this.resetForm();
  }

  private resetForm() {
    this.editMode = false;
    this.ingredientForm.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
