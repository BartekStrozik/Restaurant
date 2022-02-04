import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Dish } from 'src/app/Dish';
import { DishReserving, AmountChange } from '../../DishReserving';


@Component({
  selector: 'app-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.css']
})

export class DishItemComponent implements OnInit {
  changeType = AmountChange;
  amount: number = 0;
  maxAmount: number = 0;
  dishReserving!: DishReserving;

  @Input() dish!: Dish;
  @Input() theMostExpensive: boolean = false;
  @Input() theMostCheap: boolean = false;

  @Output() reserveDish: EventEmitter<DishReserving> = new EventEmitter();
  @Output() onDeleteDish: EventEmitter<Dish> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.maxAmount = this.dish.amountOfDishes;
  }

  changeAmount(amountChange: AmountChange){
    if(amountChange == AmountChange.MINUS && this.amount > 0){
      this.amount--;
      this.dishReserving = new DishReserving(amountChange, this.dish);
      this.reserveDish.emit(this.dishReserving);
    }
    else if(amountChange == AmountChange.PLUS && this.amount < this.maxAmount){
      this.amount++;
      this.dishReserving = new DishReserving(amountChange, this.dish);
      this.reserveDish.emit(this.dishReserving);
    }
  }

  onDelete(dish: Dish) {
    this.onDeleteDish.emit(dish);
  }

}
