import { Component, OnInit } from '@angular/core';
import {CaddyService} from '../services/caddy.service';
import {CaddyModel} from '../model/caddy.model';
import {ProductItemModel} from '../model/productItem.model';

@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.css']
})
export class CaddiesComponent implements OnInit {
   caddy: CaddyModel;

  constructor(public caddyService: CaddyService) { }

  ngOnInit(): void {
    this.caddy=this.caddyService.getCaddy() ;
    console.log(this.caddy);
  }

}
