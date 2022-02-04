import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userAuth!: Subscription;
  userAccess! : any;
  user!: any;
  historyDishes!: any[];

  constructor(
    private authService: AuthService, 
    private dishService: DishService,
    public router: Router
  ) {
    this.userAuth = this.authService.signedIn.subscribe((user) => {
      if (user) this.router.navigate(['']); 
    })
    
  }

  ngOnInit(): void {
    this.user = this.authService.user$;
    this.dishService.getUserHistory(this.user.id).subscribe((dishes) => {
      this.historyDishes = dishes;
    });
  }

  ngOnChange() : void {
  }

  ngOnDestroy(): void {
    if (this.userAuth) this.userAuth.unsubscribe();
  }

  async onSignOut(){
    await this.authService.signOut();
    this.router.navigate(['']);
  }

}
