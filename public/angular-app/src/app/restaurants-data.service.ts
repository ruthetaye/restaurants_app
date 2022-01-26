import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Restaurant } from './restaurants/restaurants.component';
import { Dish } from './restaurants/restaurants.component';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsDataService {
#baseURL: string="http://localhost:3000/api/";
  constructor(private http:HttpClient) { }

  public getRestaurants(offset:number):Promise<Restaurant[]>{
    const url:string=this.#baseURL+"restaurants?offset="+offset;
    return this.http.get(url).toPromise()
            .then(response => response as Restaurant[])
            .catch(this._handleError);
  }
  public getRestaurantsByLocation(lat:number,lng:number,distance:number):Promise<Restaurant[]>{
    const url:string=this.#baseURL+"restaurants?lat="+lat+"&lng="+lng+"&distance="+distance;
    return this.http.get(url).toPromise()
            .then(response => response as Restaurant[])
            .catch(this._handleError);
  }

  public getRestaurant(restaurantId:string):Promise<any>{
    const url:string=this.#baseURL+"restaurants/"+restaurantId;
    return this.http.get(url).toPromise()
              .then(response => response as Restaurant)
              .catch(this._handleError)
  }

  public getDishes(restaurantId:string):Promise<Dish[]>{
    const url:string=this.#baseURL+"restaurants/"+restaurantId+"/dishes";
    return this.http.get(url).toPromise()
            .then(response => response as Dish[])
            .catch(this._handleError);
  }

  public addDish(restaurantId:string,dish:Dish):Promise<Dish>{
    const url:string=this.#baseURL+"restaurants/"+restaurantId+"/dishes";
    return this.http.post(url,{name:dish.name,price:dish.price}).toPromise()
      .then(response => response as Dish)
      .catch(this._handleError);
  }

  public deleteRestaurant(restaurantId:string):Promise<any>{
    const url:string=this.#baseURL+"restaurants/"+restaurantId;
    return this.http.delete(url).toPromise()
              .then(response => response as Restaurant[])
              .catch(this._handleError);
  }

  public addRestaurant(restaurant:Restaurant):Promise<Restaurant>{
    const url:string=this.#baseURL+"restaurants";
    return this.http.post(url,{name:restaurant.name,yearOpen:restaurant.yearOpen,
                category:restaurant.category}).toPromise()
                .then(response => response as Restaurant)
                .catch(this._handleError);
  }

  public fullUpdateRestaurant(restaurantId:string, restaurant:Restaurant): Promise<Restaurant>{
    const url: string =this.#baseURL+"restaurants/" +restaurantId;
    return this.http.put(url, {name:restaurant.name,yearOpen:restaurant.yearOpen,
      category:restaurant.category}).toPromise()
              .then(response => response as Restaurant)
              .catch(this._handleError);
  }

  public partialUpdateRestaurant(restaurantId:string, restaurant:Restaurant): Promise<Restaurant>{
    const url: string =this.#baseURL+"restaurants/" +restaurantId;
    return this.http.patch(url, restaurant).toPromise()
              .then(response => response as Restaurant)
              .catch(this._handleError);
  }
  private _handleError(error:any):Promise<any>{
    console.log("service error!!",error);
    return Promise.reject(error.message || error);
  }
  
}
