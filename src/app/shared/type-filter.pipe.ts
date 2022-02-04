import { Pipe, PipeTransform } from "@angular/core";
import { Dish } from "../Dish";

@Pipe({'name': 'typePipe'})
export class TypeFilterPipe implements PipeTransform{
    transform (dishes: Dish[], types: string[]): Dish[]{
        if(types.indexOf("all") > -1) return dishes;
        let resultDishes: Dish[] = [];
        for(let type of types){
            resultDishes = [...resultDishes, ...dishes.filter(dish => dish.type === type)];
        }
        return resultDishes;
    }
}