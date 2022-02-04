import { NgModule } from '@angular/core';
import { AddDishComponent } from './add-dish/add-dish.component';
import { CartComponent } from './cart/cart.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { DishesComponent } from './dishes/dishes.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ProfileComponent } from './authentication/profile/profile.component';

import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { AdminGuard } from './services/core/admin.guard';
import { redirectLoggedInTo } from '@angular/fire/compat/auth-guard';

const redirectLoggedInToItems = () => redirectLoggedInTo(['']);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dishes', component: DishesComponent },
  { path: 'dishes/:id', component: DishDetailsComponent },
  { path: 'add-dish', component: AddDishComponent, canActivate: [AdminGuard] },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
  { path: 'register', component: RegisterComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
  { path: 'profile', component: ProfileComponent, canActivate: [AngularFireAuthGuard]}, 
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
