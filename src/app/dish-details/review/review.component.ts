import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Review } from 'src/app/Review';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  reviewForm = new FormGroup({
    nick: new FormControl('',Validators.required),
    reviewTitle: new FormControl('',Validators.required),
    reviewContent: new FormControl('',
    [Validators.required, Validators.minLength(50), Validators.maxLength(500)]),
    date: new FormControl()
  });

  reviews: Review[] = [];
  errors: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errors = [];
    if(!this.reviewForm.get("nick")?.valid){
      this.errors.push("Proszę podać nick");
    }
    if(!this.reviewForm.get("reviewTitle")?.valid){
      this.errors.push("Proszę podać tytuł recenzji");
    }
    if(!this.reviewForm.get("reviewContent")?.valid){
      this.errors.push("Treść recenzji powinna zawierać 50 - 500 znaków");
    }
    if(this.reviewForm.valid){
      this.reviews.push(this.reviewForm.value);
    }
  }
}
