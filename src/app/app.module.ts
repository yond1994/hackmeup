import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './module/home/home.component';
import { FooterComponent } from './module/components/footer/footer.component';
import { HeaderComponent } from './module/components/header/header.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { SearchComponent } from './module/components/search/search.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RestService} from "./shared/services/rest.service";
import { MyDateRangePickerModule } from 'mydaterangepicker';
import {HttpClientModule} from "@angular/common/http";
import {NgSelectModule} from "@ng-select/ng-select";
import { TicketsComponent } from './module/tickets/tickets.component';
import { RegisterComponent } from './module/register/register.component';
import { ThankComponent } from './module/thank/thank.component';
import { SearchotelComponent } from './module/components/searchotel/searchotel.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    SearchComponent,
    TicketsComponent,
    RegisterComponent,
    ThankComponent,
    SearchotelComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MyDateRangePickerModule,
    HttpClientModule,
    NgSelectModule,

  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
