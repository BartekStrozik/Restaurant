import { Pipe, PipeTransform } from "@angular/core";
import { Dish } from "../Dish";

@Pipe({'name': 'priceminPipe'})
export class PriceminFilterPipe implements PipeTransform{
    transform (dishes: Dish[], priceMin: number): Dish[]{
        return dishes.filter(dish => dish.price >= priceMin);
    }
}