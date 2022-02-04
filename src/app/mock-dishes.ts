import { Dish } from './Dish';
import { Ingredient } from './Ingredient';

export const DISHES: Dish[] = [
    new Dish(15, "Kotlety schabowe", "kuchnia polska",  "danie mięsne", "drugie danie", [new Ingredient("mięso drobiowe")], 10, 8, "To jest...", "path")
    /*{
        "dishName": "Kotlety schabowe",
        "cuisine": "kuchnia polska",
        "category": "danie mięsne",
        "type": "drugie danie",
        "ingredients": [
            { "ingredient": "mięso drobiowe" },
            { "ingredient": "jajko" }
        ],
        "amountOfDishes": 10,
        "price": 8,
        "description": "To jest kotlet schabowy."
    },
    {
        "dishName": "Rosół",
        "cuisine": "kuchnia polska",
        "category": "zupa",
        "type": "zupa",
        "ingredients": [
            { "ingredient": "włoszczyzna" },
            { "ingredient": "przyprawy" }
        ],
        "amountOfDishes": 12,
        "price": 5,
        "description": "To jest rosół."
    },
    {
        "dishName": "Pizza z ananasem",
        "cuisine": "kuchnia włoska",
        "category": "pizza",
        "type": "danie główne",
        "ingredients": [
            { "ingredient": "pizza" },
            { "ingredient": "ananas" },
        ],
        "amountOfDishes": 7,
        "price": 20,
        "description": "To jest pizza z ananasem."
    }*/
];