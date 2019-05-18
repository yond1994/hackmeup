import { Component, OnInit } from '@angular/core';
import {RestService} from "../../shared/services/rest.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: any;
  constructor(private rest: RestService) {
    this.images = [1, 2, 3].map(() => `https://picsum.photos/900/500?random&t=${Math.random()}`);
  }

  ngOnInit() {
    // this.rest.get('/1.0/search')
    //   .then((response: any) => {
    //     console.log(response);
    //   }).catch(error => {
    //     console.error(error);
    // });

  }

}
