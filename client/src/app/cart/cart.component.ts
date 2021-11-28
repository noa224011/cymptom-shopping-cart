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

  constructor(private _cartDataService: CartDataService) {}

  ngOnInit(): void {
    this._cartDataService._cartDataSource$.subscribe((cart) => {
      this.cartItems = cart;
    });
  }

  deleteItem(sku: number) {
    this._cartDataService.deleteItemFromCart(sku, this.cartItems);
  }
}
