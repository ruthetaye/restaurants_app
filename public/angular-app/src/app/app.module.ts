import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorPageComponent,
    NavigationComponent,
    RestaurantsComponent,
    RestaurantComponent,
    SearchComponent,
    FooterComponent,
    AddComponent,
    UpdateComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:"",
        component:HomeComponent
      },
      {
        path:"restaurants",
        component: RestaurantsComponent
      },
      {
        path:"restaurants/:restaurantId",
        component:RestaurantComponent
      },
      {
        path:"search",
        component:SearchComponent
      },
      {
        path:"add",
        component:AddComponent
      },
      {
        path:"restaurants/:restaurantId/update",
        component:UpdateComponent
      },
      {
        path:"**",
        component:ErrorPageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
