import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signUpForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  })

  public userAuth!: Subscription;
  constructor(
    private authService: AuthService, 
    public router: Router) {
      this.userAuth = this.authService.signedIn.subscribe((user) => {
        if (user) this.router.navigate(['dishes']); 
      })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.userAuth) this.userAuth.unsubscribe();
  }

  async onSignUp() {
    console.log(this.signUpForm.value);
    if(this.signUpForm.valid){
      await this.authService.signUp(this.signUpForm.value.email.toString(), this.signUpForm.value.password.toString());
      this.router.navigate(['profile']);
    }
  }
}
