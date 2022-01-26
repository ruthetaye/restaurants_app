import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { Restaurant } from '../restaurants/restaurants.component';
import { RestaurantsDataService } from '../restaurants-data.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  newRestaurant!:Restaurant;
  addRestaurantForm!:NgForm;
  
  constructor(private restaurantService: RestaurantsDataService) { 
  this.newRestaurant = new Restaurant("","",0.0,"",[]);
}

  ngOnInit(): void {
  }

  save(){
    this.restaurantService.addRestaurant(this.newRestaurant)
          .then(response =>console.log("restaurant added",response))
          .catch((error => this._handleErrors(error)));
  }

  private _handleErrors(error:any){
    console.log("error:",error);
  }

}
