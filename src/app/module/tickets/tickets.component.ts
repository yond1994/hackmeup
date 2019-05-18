import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {RestService} from "../../shared/services/rest.service";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  data: any =[];
  ida: any = [];
  return: any = [];
  dataurl: any;
  idfrom: any;
  tipefrom:any;
  idto: any;
  tipeto:any;
  constructor( private route: ActivatedRoute, private rest: RestService,  private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['filter']) {
        let d = params['filter'].toString();
        this.dataurl = d;
        this.data = JSON.parse(d);
        console.log(this.data);
        let ruta = 'origin_available_zone_id='+this.data.origin_available_zone_id+
          '&destination_available_zone_id='+this.data.destination_available_zone_id+
          '&inbound_date='+this.data.date_from+
          '&outbound_date='+this.data.date_to+
          '&persons='+this.data.adults;
        this.rest.get('/1.0/train/search?'+ ruta).then( (resp: any) => {
          this.ida = resp.data.back_way;
          this.return =  resp.data.go_way;
        }).catch(error=> {

        })
      }
    });
  }
  addida(id, tipe) {
    this.idfrom = id;
    this.tipefrom = tipe;
  }
  addto(id, tipe) {
    this.idto = id;
    this.tipeto =tipe;
  }
  ir() {
    this.router.navigateByUrl('/register/' +this.dataurl+'/'+this.idfrom+'/'+this.tipefrom+'/'+this.idto+'/'+this.tipeto);
  }

}
