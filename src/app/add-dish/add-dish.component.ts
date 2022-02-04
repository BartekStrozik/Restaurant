import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms'; 
import { EventEmitter } from '@angular/core';
import { Dish } from '../Dish';
import { Ingredient } from '../Ingredient';
import { DishService } from '../services/dish.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})
export class AddDishComponent implements OnInit {
  dishForm = new FormGroup({
    name: new FormControl(),
    cuisine: new FormControl(),
    category: new FormControl(),
    type: new FormControl(),
    ingredients: new FormArray([]),
    amountOfDishes: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    representingImage: new FormControl(),
    images: new FormArray([])
  });

  selectedFile!: File;

  constructor(private dishService: DishService, private router: Router) { }

  ngOnInit(): void {
  }

  getIngredientsControls() {
    return (<FormArray>this.dishForm.get('ingredients')).controls;
  }

  addIngredient(){
    (<FormArray> this.dishForm.get('ingredients')).push(new FormControl())
  }

  getImagesControls() {
    return (<FormArray>this.dishForm.get('images')).controls;
  }

  addImage(){
    (<FormArray> this.dishForm.get('images')).push(new FormControl())
  }

  onFileSelected(event: any){
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit() {
    //this.onUpload();
    this.dishService.addDish(this.dishForm.value);
    this.router.navigate(['dishes']);
  }

  onUpload(){
    const fd = new FormData();
    if(this.selectedFile != null){
      fd.append('image', this.selectedFile, this.selectedFile.name)
      this.dishForm.value.representingImage = this.selectedFile.name;
    }
    else {
      return;
    }
  }
}
