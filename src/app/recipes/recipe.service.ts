import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{
  
  recipeSelected = new EventEmitter<Recipe>();

  constructor(private slService: ShoppingListService){}
  
  private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
        'This is simply a test',
        'https://thecozycook.com/wp-content/uploads/2022/04/Lasagna-Recipe-f-500x500.jpg',
        [new Ingredient('Meat',1),new Ingredient('French Fries',20)]),
        
        new Recipe('Another Test Recipe',
        'another test',
        'https://thecozycook.com/wp-content/uploads/2022/04/Lasagna-Recipe-f-500x500.jpg',
        [new Ingredient('Buns', 2), new Ingredient('Meat',1)])
      ];

      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(id: number){
        return this.recipes[id];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }
}