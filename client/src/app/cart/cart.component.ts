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
  @Input() isFromLocalStorage: Boolean = false;

  constructor(private _localStorageService: LocalStorageService) {}

  ngOnInit(): void {}

  deleteItemFromCart(sku: number) {
    const itemIndex = this.cartItems.findIndex((item) => item.sku === sku);
    if (itemIndex !== -1) {
      this.cartItems.splice(itemIndex, 1);
      this._localStorageService.setInfo('cart', this.cartItems);
    }
  }
}
