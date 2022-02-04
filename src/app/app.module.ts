import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesComponent } from './dishes/dishes.component';
import { DishItemComponent } from './dishes/dish-item/dish-item.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { ReviewComponent } from './dish-details/review/review.component';
import { AddDishComponent } from './add-dish/add-dish.component';
import { FiltersComponent } from './filters/filters.component';
import { CuisineFilterPipe } from './shared/cuisine-filter.pipe';
import { TypeFilterPipe } from './shared/type-filter.pipe';
import { PriceminFilterPipe } from './shared/pricemin-filter.pipe';
import { PricemaxFilterPipe } from './shared/pricemax-filter.pipe';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps'
import { NgxPaginationModule } from 'ngx-pagination';

//import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
//import { provideAuth,getAuth } from '@angular/fire/auth'

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
//import { AngulaFireDatabase } from '@angular/fire/compat/database';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ProfileComponent } from './authentication/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DishesComponent,
    DishItemComponent,
    AddDishComponent,
    FiltersComponent,
    CuisineFilterPipe,
    TypeFilterPipe,
    PriceminFilterPipe,
    PricemaxFilterPipe,
    CartComponent,
    DishDetailsComponent,
    ReviewComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    NgxPaginationModule,
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideAuth(() => getAuth()),
    //AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [
    CuisineFilterPipe,
    TypeFilterPipe,
    PriceminFilterPipe,
    PricemaxFilterPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
