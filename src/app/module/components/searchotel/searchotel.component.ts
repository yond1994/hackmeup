import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../../shared/services/rest.service";
import {NgSelectConfig} from "@ng-select/ng-select";
import {Router} from "@angular/router";
import {IMyDrpOptions} from 'mydaterangepicker';
@Component({
  selector: 'app-searchotel',
  templateUrl: './searchotel.component.html',
  styleUrls: ['./searchotel.component.css']
})
export class SearchotelComponent implements OnInit {

  public form: any = FormGroup;

  // variable declarando el formato del calendario
  myDateRangePickerOptions: IMyDrpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  private model: any = {
    beginDate: {year: 2019, month: 5, day: 18},
    endDate: {year: 2019, month: 5, day: 19}
  };
  // decalarando ciudades
  cities: any;
  adults: any = 1;
  constructor(private fb: FormBuilder, private rest: RestService, private config: NgSelectConfig, private router: Router) {
    this.config.notFoundText = 'Custom not found';
    this.form = fb.group({
      'origin_available_zone_id': [null, Validators.required],
      'destination_available_zone_id': [null, Validators.required],
      'dates': [null, Validators.required],
      'adults': [null, Validators.required],
    });
  }

  ngOnInit() {
    this.rest.get('/1.0/train/zones?limit=30')
      .then((response: any) => {
        this.cities = response.data.data;
        console.log(response);
      }).catch(error => {
      console.error(error);
    });
  }

  save(event) {
    if (event) {
      event.preventDefault();
      let datefront = moment(this.form.value.dates.beginJsDate).format("YYYY-MM-DD HH:mm");
      let dateto =  moment(this.form.value.dates.endJsDate).format("YYYY-MM-DD HH:mm");
      let body = {
        date_from: datefront,
        date_to: dateto,
        origin_available_zone_id: this.form.value.origin_available_zone_id,
        destination_available_zone_id: this.form.value.destination_available_zone_id,
        adults: this.form.value.adults
      }
      let datasend = JSON.stringify(body);
      this.router.navigateByUrl('/tickets/' + datasend );
    }
  }
}
