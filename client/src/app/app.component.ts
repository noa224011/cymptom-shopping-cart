import { Component } from '@angular/core';
import { IProduct } from './interfaces/IProduct';
import { CartDataService } from './services/cart-data/cart-data.service';
import { LocalStorageService } from './services/local-storage/local-storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'cymptom-shopping-cart';
  cartItems: Array<IProduct> = [];
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
    if (cart.length === 0) {
      this.isFromLocalStorage = false;
    } else {
      this.cartItems = this._localStorageService.getInfo('cart');
      this.isFromLocalStorage = true;
    }
  }
}
