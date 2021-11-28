import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IProduct } from '../../interfaces/IProduct';
import { LocalStorageService } from '../local-storage/local-storage-service.service';

@Injectable({
  providedIn: 'root',
})
export class CartDataService {
  private _cartDataSource = new Subject<Array<IProduct>>();
  _cartDataSource$ = this._cartDataSource.asObservable();

  constructor(private _localStorageService: LocalStorageService) {}

  sendCart(cart: Array<IProduct>) {
    this._cartDataSource.next(cart);
  }

  deleteItemFromCart(sku: number, cartItems: Array<IProduct>) {
    const itemIndex = cartItems.findIndex((item) => item.sku === sku);
    if (itemIndex !== -1) {
      cartItems.splice(itemIndex, 1);
      this._localStorageService.setInfo('cart', cartItems);
    }
  }
}
