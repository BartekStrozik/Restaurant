import { Ingredient } from "./Ingredient";
import { Image } from "./Image";

export class Dish {
    id: number;
    name: string;
    cuisine: string;
    category: string;
    type: string;
    ingredients: Ingredient[];
    amountOfDishes: number;
    price: number;
    description: string;
    representingImage: string;
    images?: Image[];

    constructor(id: number, name: string, cuisine: string, category: string, type: string, ingredients: Ingredient[],
        amountOfDishes: number, price: number, description: string, representingImage: string){
        this.id = id;
        this.name = name;
        this.cuisine = cuisine;
        this.category = category;
        this.type = type;
        this.ingredients = ingredients;
        this.amountOfDishes = amountOfDishes;
        this.price = price;
        this.description = description;
        this.representingImage = representingImage;
    }
}