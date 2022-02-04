import { Pipe, PipeTransform } from "@angular/core";
import { Dish } from "../Dish";

@Pipe({'name': 'cuisinePipe'})
export class CuisineFilterPipe implements PipeTransform{
    transform (dishes: Dish[], cuisines: string[]): Dish[]{
        if(cuisines.indexOf("all") > -1) return dishes;
        let resultDishes: Dish[] = [];
        for(let cuisine of cuisines){
            resultDishes = [...resultDishes, ...dishes.filter(dish => dish.cuisine === cuisine)];
        }
        return resultDishes;
    }
}