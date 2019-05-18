import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RestService} from "../../shared/services/rest.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {error} from "util";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data: any;
  idfrom: any;
  tipefrom: any;
  idto: any;
  tipeto: any;
  idhotel: any;
  public form: any = FormGroup;
  constructor(private fb: FormBuilder,private route: ActivatedRoute, private rest: RestService,  private router: Router) {
    this.form = fb.group({
      'first_name': [null, Validators.required],
      'last_name': [null, ],
      'phone': [null, Validators.required],
      'email': [null, Validators.required],
      'contact_first_name': [null, Validators.required],
      'contact_last_name': [null,],
      'contact_email': [null, Validators.required],
      'contact_phone': [null, Validators.required],
      'type_reservations': [null],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['filter']) {
        let d = params['filter'].toString();
        this.data = JSON.parse(d);
      }
      if (params['from']) {
       this.idfrom = params['from'].toString();
      }
      if (params['tipefrom']) {
        this.tipefrom  = params['tipefrom'].toString();
      }
      if (params['to']) {
        this.idto = params['to'].toString();
      }
      if (params['tipeto']) {
        this.tipeto  = params['tipeto'].toString();
      }
      if (params['id']) {
        this.idhotel  = params['id'].toString();
      }
    });
  }
  save(event) {

    if (event) {
      event.preventDefault();
      if(this.idhotel) {
        delete  this.form.value.contact_first_name;
        delete  this.form.value.contact_last_name;
        delete  this.form.value.contact_phone;
        delete  this.form.value.contact_email;
        this.form.value.hotel_available = this.idhotel;
        this.form.value.type_reservations = 'standar';
        this.form.value.date_start = this.data.date_from;
        this.form.value.date_finish = this.data.date_to;
        let body = this.form.value;
        console.log(body);
        this.rest.post('/1.0/hotel/reservations', body).then(value => {
          console.log(value);
          this.router.navigateByUrl('/thank');
        }).catch(error=> {
          console.log(error);
        })
      }else {
        if( this.idfrom) {
          this.form.value.type_reservations = this.tipeto;
          this.form.value.available_trip_id = this.idfrom;
          let body = this.form.value;
          console.log(body);
          this.rest.post('/1.0/train/reservations', body).then(value => {
            console.log(value);
          }).catch()
        }
        if(this.idto) {
          this.form.value.type_reservations = this.tipeto;
          this.form.value.available_trip_id = this.idto;
          let body = this.form.value;
          console.log(body);

          this.rest.post('/1.0/train/reservations', body).then(value => {
            console.log(value);
            this.router.navigateByUrl('/thank');
          }).catch(error => {
            console.log(error);
          })
        }
      }


    }
  }
  sent() {

  }
}
