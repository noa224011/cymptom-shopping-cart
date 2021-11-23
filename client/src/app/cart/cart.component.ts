import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/IProduct';
import { CartDataService } from '../services/cart-data/cart-data.service';
import { GetsService } from '../services/gets/gets.service';
import { LocalStorageService } from '../services/local-storage/local-storage-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: Array<IProduct> = [];
  productError: any = '';

  constructor(
    private _cartDataService: CartDataService,
    private _getsService: GetsService,
    private _localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this._cartDataService._cartDataSource$.subscribe((cart) => {
      this.cartItems = cart;
    });
  }

  deleteItem(sku: number) {
    this._getsService.getProductById(sku).subscribe({
      next: (result) => {
        const itemIndex = this.cartItems.findIndex(
          (item) => item.sku === result.sku
        );
        if (itemIndex !== -1) {
          this.cartItems.splice(itemIndex, 1);
          this._localStorageService.setInfo('cart', this.cartItems);
        }
      },
      error: (error) => (this.productError = error),
    });
  }
}
