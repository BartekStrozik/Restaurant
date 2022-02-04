import { Component, OnInit, OnChanges } from '@angular/core';
import { DishService } from '../services/dish.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Dish } from '../Dish';
import { Price } from '../Price';
import { DishReserving, AmountChange } from '../DishReserving';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  dishes!: Dish[];
  reservedDishes: number = 0;

  cuisineFilter: string[] = ["all"];
  typeFilter: string[] = ["all"];
  priceMinFilter: number = 0;
  priceMaxFilter: number = 100;

  p: number = 1;

  constructor(
    private dishService: DishService,
    private cartService: CartService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.dishService.getDishes().subscribe((dishes) => {
      this.dishes = dishes;
    });
    this.cartService.dishes = [];
  }

  changeAmount(dishReserving: DishReserving) {
    if (dishReserving.amountChange == AmountChange.MINUS) {
      this.reservedDishes--;
      this.cartService.deleteDish(dishReserving.dish);
    }
    else if (dishReserving.amountChange == AmountChange.PLUS) {
      this.reservedDishes++;
      this.cartService.addDish(dishReserving.dish);
    }
  }

  /* filters */

  cuisineFilterBy(args: string[]) {
    let index = this.cuisineFilter.indexOf("all");
    if (index > -1) this.cuisineFilter = [];
    this.cuisineFilter = this.cuisineFilter.map(cuisine => cuisine);

    let cuisine = args[0];
    let checked = args[1];
    if (checked === "checked") {
      this.cuisineFilter.push(cuisine);
    }
    else {
      let index = this.cuisineFilter.indexOf(cuisine);
      if (index > -1) this.cuisineFilter.splice(index, 1);
    }

    if (this.cuisineFilter.length == 0) {
      this.cuisineFilter.push("all");
    }
  }

  typeFilterBy(args: string[]) {
    let index = this.typeFilter.indexOf("all");
    if (index > -1) this.typeFilter = [];
    this.typeFilter = this.typeFilter.map(type => type);

    let type = args[0];
    let checked = args[1];
    if (checked === "checked") {
      this.typeFilter.push(type);
    }
    else {
      let index = this.typeFilter.indexOf(type);
      if (index > -1) this.typeFilter.splice(index, 1);
    }

    if (this.typeFilter.length == 0) {
      this.typeFilter.push("all");
    }
  }

  pricesFilterBy(price: Price) {
    this.priceMinFilter = price.priceMin;
    this.priceMaxFilter = price.priceMax;
  }
}
