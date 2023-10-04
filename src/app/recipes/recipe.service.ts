import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService{

  constructor(private slService: ShoppingListService){}

  recipesChanged = new Subject<Recipe[]>();
  
  // Default Recipe Array, app now post(put), and get and set recipes array
  // private recipes: Recipe[] = [
  //       new Recipe('A Test Recipe',
  //       'This is simply a test',
  //       'https://thecozycook.com/wp-content/uploads/2022/04/Lasagna-Recipe-f-500x500.jpg',
  //       [new Ingredient('Meat',1), new Ingredient('French Fries',20)]),
        
  //       new Recipe('Another Test Recipe',
  //       'another test',
  //       'https://thecozycook.com/wp-content/uploads/2022/04/Lasagna-Recipe-f-500x500.jpg',
  //       [new Ingredient('Buns', 2), new Ingredient('Meat',1)])
  //     ];

  private recipes: Recipe[] = [];

      setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(id: number){
        return this.recipes[id];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipesChanged.next(this.recipes.slice());
      }
}