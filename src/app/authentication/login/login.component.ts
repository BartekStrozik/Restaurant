import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })
  public signInFailed!: boolean;
  public userAuth!: Subscription;

  constructor(
    private authService: AuthService, 
    public router: Router) {

    this.signInFailed = false;
    this.userAuth = this.authService.signedIn.subscribe((user) => {
      if (user) this.router.navigate(['']); 
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.userAuth) this.userAuth.unsubscribe();
  }

  async onSignIn() {
    this.signInFailed = false;
    if(this.signInForm.valid){
      await this.authService.signIn(this.signInForm.value.email.toString(), this.signInForm.value.password.toString());
      this.router.navigate(['profile']);
    }
  }

}
