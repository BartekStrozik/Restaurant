import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Dish } from '../Dish';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { User } from '../User';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  dishes: any[] = [];
  totalPrice: number = 0;

  constructor(
    private firestore: AngularFirestore,
    private cartService: CartService, 
    private authService: AuthService) { }

  ngOnInit(): void {
    this.dishes = this.cartService.dishes;
    for(let dish of this.dishes) this.totalPrice += dish.price;
  }

  ngOnChange() : void {
    for(let dish of this.dishes) this.totalPrice += dish.price;
  }

  buyDishes() {
    if(this.authService.getAuthStatus()){
      let user = this.authService.user$;
      //console.log("user id:" + user.email);
      const users = this.firestore.collection<User>('users').valueChanges();
      users.forEach(usersData => {
        usersData.forEach(u => {
          if(u.email === user.email){
            this.dishes.forEach(dish => {
              this.firestore
              .collection<User>('users')
              .doc(u.uid)
              .collection('history')
              .add(dish);
            })
          }
        })
      });
    }
    //this.dishes = [];
    this.totalPrice = 0;
  }
}
