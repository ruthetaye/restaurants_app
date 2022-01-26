import { Component, OnInit } from '@angular/core';

import { Restaurant } from '../restaurants/restaurants.component';
import { RestaurantsDataService } from '../restaurants-data.service';
import { NgForm } from '@angular/forms';

export class Location{
  #lat!:number;
  #lng!:number;
  #distance!:number;

  set lat(lat:number){this.#lat=lat;}
  get lat(){return this.#lat;}

  set lng(lng:number){this.#lng=lng;}
  get lng(){return this.#lng;}

  set distance(distance:number){this.#distance=distance;}
  get distance(){return this.#distance;}
  constructor(lat:number,lng:number,distance:number) {
    this.#lat=lat;
    this.#lng=lng;
    this.#distance=distance;
   }
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
    searchForm!:NgForm;
    restaurants: Restaurant[]=[];
    location!:Location;

  constructor(private restaurantService:RestaurantsDataService) {
    //this.restaurant = new Restaurant("","",0.0,"",[]);
    this.location = new Location(0,0,0);

   }

   ngOnInit(): void {
    
  }

  search(){
    this.restaurantService.getRestaurantsByLocation(this.location.lat,this.location.lng,this.location.distance)
    .then(response =>this._setRestaurants(response))
    .catch(this._handleErrors)
  }

  private _setRestaurants(restaurants:Restaurant[]){
    this.restaurants=restaurants;
  }

  private _handleErrors(error:any){
    console.log("error:",error);
  }

  

}
