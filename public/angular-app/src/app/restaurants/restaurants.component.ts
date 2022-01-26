import { Component, OnInit } from '@angular/core';

import { RestaurantsDataService } from '../restaurants-data.service';


export class Restaurant{
  #name!:string;
  #yearOpen!:number;
  #category!:string;
  #dishes!:[];
  #_id!:string;

  set name(name:string){this.#name=name;}
  get name(){return this.#name;}
  set yearOpen(yearOpen:number){this.#yearOpen=yearOpen;}
  get yearOpen(){return this.#yearOpen;}
  set category(category:string){this.#category=category;}
  get category(){return this.#category;}
  set dishes(dishes:[]){this.#dishes=dishes;}
  get dishes(){return this.#dishes;}
  get _id(){return this.#_id;}

  constructor(_id:string,name:string,yearOpen:number,category:string,dishes:[]){
    this.#_id=_id;
    this.#category=category;
    this.#dishes=dishes;
    this.#name=name;
  }  

}

export class Dish{
  #name!:string;
  #_id!:string;
  #price!:number;

  set name(name:string){this.#name=name;}
  get name(){return this.#name;}
  set price(price:number){this.#price=price;}
  get price(){return this.#price;}
  get _id(){return this.#_id;}

  constructor(_id:string,name:string,price:number){
    this.#_id=_id;
    this.#name=name;
    this.#price=price;
  } 
}
@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {
  restaurants:Restaurant[]=[];
  newRestaurant!:Restaurant;
    #offset:number=0;
    #count:number=5;
    constructor(private restaurantService: RestaurantsDataService) { 
    this.newRestaurant = new Restaurant("","",0.0,"",[]);
    }
    set offset(offset:number){this.#offset=offset;}
    get offset(){return this.#offset;}
    get count (){return this.#count;}

  ngOnInit(): void {
    this.restaurantService.getRestaurants(this.offset)
    .then(response =>this._setRestaurants(response))
    .catch(this._handleErrors)
  }

  private _setRestaurants(restaurants:Restaurant[]){
    this.restaurants=restaurants;
  }

  public next(){
    this.#offset+=this.#count;
    this.restaurantService.getRestaurants(this.offset)
    .then(response => this._setRestaurants(response))
    .catch(error=> this._handleErrors(error))
  }

  public previous(){
    this.#offset-=this.#count;
    this.restaurantService.getRestaurants(this.offset)
    .then(response => this._setRestaurants(response))
    .catch(error=> this._handleErrors(error))
  }

  private _handleErrors(error:any){
    console.log("error:",error);
  }

}
