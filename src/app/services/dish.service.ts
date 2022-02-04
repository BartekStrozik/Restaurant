import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { Dish } from '../Dish';
import { Image } from '../Image';
import { Ingredient } from '../Ingredient';
import { User } from '../User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private firestore: AngularFirestore;

  dishesCollection!: AngularFirestoreCollection;
  dishes!: Observable<Dish[]>;
  dishesId: number = 24;

  constructor(private http: HttpClient, firestore: AngularFirestore) {
    this.firestore = firestore;
  }

  getDishes(): Observable<any[]> {
    //const dataRef = this.firestore.collection<Dish>('dishes');
    //dataRef.doc("d0ZVLdOotNvXTrxRy1vE").delete();
    return this.firestore.collection('dishes').valueChanges();
  }

  getDish(id: string): Observable<any> {
    return this.firestore.collection<Dish>('dishes')
      .doc<Dish>(id)
      .valueChanges();
  }

  getDishImages(id: string): Observable<any[]> {
    return this.firestore.collection<Dish>('dishes')
      .doc<Dish>(id)
      .collection<Image>('images')
      .valueChanges();
  }

  getDishIngredients(id: string): Observable<any[]> {
    return this.firestore.collection<Dish>('dishes')
    .doc<Dish>(id)
    .collection<Ingredient>('ingredients')
    .valueChanges();
  }

  getUserHistory(uid: string): Observable<any[]>{
    return this.firestore.collection<User>('users')
    .doc<User>(uid)
    .collection<Dish>('history')
    .valueChanges();
    //return data;
  }

  addDish(dish: Dish): void {
    this.dishesId++;
    dish.id = this.dishesId;
    //this.firestore.collection<Dish>('dishes').add(dish);
    this.firestore.collection<Dish>('dishes').doc(this.dishesId.toString()).set(dish);
  }

  deleteDish(id: string): void {
    const dataRef = this.firestore.collection<Dish>('dishes').doc(id);
    dataRef.delete();
  }
}
