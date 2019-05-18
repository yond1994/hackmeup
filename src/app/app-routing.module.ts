import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "./module/home/home.component";
import {TicketsComponent} from "./module/tickets/tickets.component";
import {RegisterComponent} from "./module/register/register.component";
import {ThankComponent} from "./module/thank/thank.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tickets/:filter', component: TicketsComponent},
  { path: 'register/:filter/:from/:tipefrom/:to/:tipeto', component: RegisterComponent},
  { path: 'thank', component: ThankComponent}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



