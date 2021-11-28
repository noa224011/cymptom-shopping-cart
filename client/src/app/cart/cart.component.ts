import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { CartDataService } from '../services/cart-data/cart-data.service';
import { LocalStorageService } from '../services/local-storage/local-storage-service.service';
import _ from 'lodash';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  @Input() cartItems: Array<IProduct> = [];
  isFromLocalStorage: Boolean = false;

  constructor(
    private _cartDataService: CartDataService,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this._cartDataService._cartDataSource$.subscribe((cart) => {
      this.cartItems = cart;
    });

    const cart = this._localStorageService.getInfo('cart');
    if (Object.keys(cart).length === 0) {
      this.isFromLocalStorage = false;
    } else {
      this.cartItems = this._localStorageService.getInfo('cart');
      this.isFromLocalStorage = true;
    }
  }

  deleteItemFromCart(sku: number) {
    const itemIndex = this.cartItems.findIndex((item) => item.sku === sku);
    if (itemIndex !== -1) {
      this.cartItems.splice(itemIndex, 1);
      this._localStorageService.setInfo('cart', this.cartItems);
    }
  }
}
