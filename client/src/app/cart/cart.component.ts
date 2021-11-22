import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { CartDataService } from '../services/cart-data/cart-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Array<IProduct> = [];

  constructor(private _cartDataService: CartDataService) {}

  ngOnInit(): void {
    this._cartDataService._cartDataSource$.subscribe((cart) => {
      this.cartItems = cart;
      console.log('COMING FROM CART COMPONENT!', this.cartItems);
    });
  }

  deleteItem(sku: string) {
    console.log(sku);
  }
}
