import {Product} from './Product';
import {ProductItemModel} from './productItem.model';
import {ClientModel} from './client.model';

export class CaddyModel {
  public name:string;
  public items:Map<number,ProductItemModel> = new Map();
  public client:ClientModel;

  constructor(name:string) {
    this.name = name;
  }
}
