import { Pipe, PipeTransform } from "@angular/core";
import { Dish } from "../Dish";

@Pipe({'name': 'pricemaxPipe'})
export class PricemaxFilterPipe implements PipeTransform{
    transform (dishes: Dish[], priceMax: number): Dish[]{
        return dishes.filter(dish => dish.price <= priceMax);
    }
}