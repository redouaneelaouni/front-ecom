import {Injectable, OnInit} from '@angular/core';
import {CaddyModel} from '../model/caddy.model';
import {Product} from '../model/Product';
import {ProductItemModel} from '../model/productItem.model';

@Injectable({
  providedIn: 'root'
})
export class CaddyService implements OnInit {


  currentCaddyName: string = 'caddy1';
  public caddies: Map<string, CaddyModel> = new Map();
  private caddies1: ProductItemModel;


  constructor() {
    let caddies1 = localStorage.getItem('mycaddies');


    if (caddies1) {
      console.log('exist');
      this.caddies.set(this.currentCaddyName, JSON.parse(caddies1));
    } else {
      console.log('doesnt exist');
      let caddy = new CaddyModel(this.currentCaddyName);
      this.caddies[this.currentCaddyName]=caddy;
    }
    //
    //   let caddy = new CaddyModel(this.currentCaddyName);
    //   this.caddies[this.currentCaddyName]=caddy;
  }

  ngOnInit(): void {

  }

  public addProductToCaddy(product: Product) {
    let caddy = this.caddies[this.currentCaddyName];
    let productItem: ProductItemModel = caddy.items[product.id];
    if (productItem) {
      console.log('add');
      productItem.quantity += product.quantity;
      productItem.price = productItem.quantity * product.currentPrice;

    } else {
      console.log('no add');
      productItem = new ProductItemModel();
      productItem.quantity = product.quantity;
      productItem.price = productItem.quantity * product.currentPrice;
      productItem.product = product;
      caddy.items[product.id] = productItem;
    }

    this.saveCaddy();

  }

  public saveCaddy() {
    console.log('save');
    console.log(this.caddies);
    localStorage.setItem('myCaddies', JSON.stringify(this.caddies));


  }

  public getCurrentCaddy(): CaddyModel {
    console.log(this.caddies[this.currentCaddyName]);
    return this.caddies[this.currentCaddyName];

  }


  getTotal(): number {
    let caddy = this.caddies[this.currentCaddyName];

    let total: number = 0;
    caddy.items.forEach(value => {
      total += value.price;
    });
    return total;
  }

  public getCaddy(): CaddyModel {
    let caddy = this.caddies[this.currentCaddyName];
    return caddy;
  }


}
