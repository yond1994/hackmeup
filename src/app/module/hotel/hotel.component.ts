import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RestService} from "../../shared/services/rest.service";

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {
  dataurl: any;
  data: any;
  hotels: any = [];
  constructor(private route: ActivatedRoute, private rest: RestService,  private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['filter']) {
        let d = params['filter'].toString();
        this.dataurl = d;
        this.data = JSON.parse(d);
        console.log(this.data);
        let ruta = 'origin_available_zone_id='+this.data.origin_available_zone_id+
          '&inbound_date='+this.data.date_from+
          '&outbound_date='+this.data.date_to+
          '&persons='+this.data.adults;
        this.rest.get('/1.0/hotel/search?'+ ruta).then( (resp: any) => {
          this.hotels = resp.data.data;
        }).catch(error=> {

        })
      }
    });
  }
  ir(id) {
    this.router.navigateByUrl('/register/' +id);
  }

}
