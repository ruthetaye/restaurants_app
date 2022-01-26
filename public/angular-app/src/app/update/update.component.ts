import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Restaurant } from '../restaurants/restaurants.component';
import { RestaurantsDataService } from '../restaurants-data.service';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  restaurant!: Restaurant;
  updatedRestaurant!:Restaurant;
  restaurantId!:string;
  constructor(private restaurantService: RestaurantsDataService, private route: ActivatedRoute) { 
  this.restaurant = new Restaurant("","",0.0,"",[]);
  this.updatedRestaurant = new Restaurant("","",0.0,"",[]);

  this.restaurantId = route.snapshot.params["restaurantId"];
}

  ngOnInit(): void {

  }

  update(){
    this.restaurantService.fullUpdateRestaurant(this.restaurantId, this.updatedRestaurant)
    .then(response =>console.log("restaurant updated",response))
    .catch((error => this._handleErrors(error)));
  }

  private _handleErrors(error:any){
    console.log("error:",error);
  }


}
