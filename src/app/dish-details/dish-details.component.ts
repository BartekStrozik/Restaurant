import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from '../Dish';
import { DishReserving, AmountChange } from '../DishReserving';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { Image } from '../Image';

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  changeType = AmountChange;
  dish!: Dish;
  images!: Image[];
  amount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dishService: DishService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dishService.getDish(id.toString()).subscribe((dish) => {
      this.dish = dish;
    });
    this.dishService.getDishImages(id.toString()).subscribe((images) => {
      this.images = images;
    })
  }

  changeAmount(amountChange: AmountChange) {
    if (amountChange == AmountChange.MINUS && this.amount > 0) {
      this.amount--;
      this.cartService.deleteDish(this.dish);
    }
    else if (amountChange == AmountChange.PLUS) {//&& //this.amount < this.dish.amountOfDishes){
      this.amount++;
      this.cartService.addDish(this.dish);
    }
  }

  onDelete(id: number){
    this.dishService.deleteDish(id.toString());
    this.router.navigate(['dishes']);
  }
}
