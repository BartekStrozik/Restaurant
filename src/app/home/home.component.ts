import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  mapOptions: google.maps.MapOptions = {
    center: { lat: 50.0554950920575, lng: 19.93621671526735 },
    zoom: 14
  }
  marker = {
    position: { lat: 50.0554950920575, lng: 19.93621671526735 },
  }

  isSignedIn: boolean = false;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('user') !== null){
      this.isSignedIn = true;
    }
    else{
      this.isSignedIn = false;
    }
  }

}
