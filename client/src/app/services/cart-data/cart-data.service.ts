import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from '../../interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class CartDataService {
  private _cartDataSource = new Subject<Array<IProduct>>();
  _cartDataSource$ = this._cartDataSource.asObservable();

  constructor() {}

  sendCart(cart: Array<IProduct>) {
    this._cartDataSource.next(cart);
  }
}
