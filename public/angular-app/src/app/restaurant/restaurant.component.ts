import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { RestaurantsDataService } from '../restaurants-data.service';
import { Restaurant } from '../restaurants/restaurants.component';
import { Dish } from '../restaurants/restaurants.component';
import { CategoryPipe } from '../category.pipe';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  restaurant!:Restaurant;
  restaurantId!:string;

  newdish!:Dish;
  dishes:Dish[]=[];
  dishId!:string;
  updateRestaurantForm!:NgForm;
  addDishForm!:NgForm;
  updatedRestaurant!:Restaurant;

  constructor(private restaurantService:RestaurantsDataService, private route:ActivatedRoute) { 
    this.restaurant = new Restaurant("","",0,"",[]);
    this.restaurantId = route.snapshot.params["restaurantId"];
    this.newdish = new Dish("","",0.0);
    this.updatedRestaurant = new Restaurant("","",0,"",[]);
  }

  ngOnInit(): void {
    this.restaurantService.getRestaurant(this.restaurantId)
    .then(response => {this.restaurant=response})
    .catch(this._handleErrors);

    this.restaurantService.getDishes(this.restaurantId)
    .then(response =>this._setDishes(response))
    .catch(this._handleErrors)
  }
  
  delete(){
    this.restaurantService.deleteRestaurant(this.restaurantId)
    .then(response => (console.log(response)))
    .catch(error => (console.log("error deleting game",error)));
  }

  update(){
    this.restaurantService.fullUpdateRestaurant(this.restaurantId, this.updatedRestaurant)
    .then(response =>console.log("restaurant updated",response))
    .catch((error => this._handleErrors(error)));
  }
  

  saveDish(){
    this.restaurantService.addDish(this.restaurantId,this.newdish)
          .then(response =>console.log("dish added",response))
          .catch((error => this._handleErrors(error)));
  }

  private _setDishes(dishes:Dish[]){
    this.dishes=dishes;
    console.log(dishes[0].name);
    
  }

  private _handleErrors(error:any){
    console.log("error:",error);
  }

}
