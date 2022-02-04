import { Dish } from "./Dish";

export enum AmountChange {
    PLUS,
    MINUS
}

export class DishReserving {
    amountChange: AmountChange;
    dish: Dish;

    constructor(amountChange: AmountChange, dish: Dish){
        this.amountChange = amountChange;
        this.dish = dish;
    }
}