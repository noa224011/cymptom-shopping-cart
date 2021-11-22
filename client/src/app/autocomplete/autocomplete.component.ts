import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts/posts.service';
import { GetsService } from '../services/gets/gets.service';
import { IProduct } from '../interfaces/IProduct';
import { CartDataService } from '../services/cart-data/cart-data.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  productsNames: Array<IProduct> = [];
  cart: Array<IProduct> = [];
  input: string = '';
  hasQuery: Boolean = false;
  productError: any = '';

  constructor(
    private _postsService: PostsService,
    private _getsService: GetsService,
    private _cartDataService: CartDataService
  ) {}

  ngOnInit(): void {}

  sendInput(event: any) {
    const query: string = event.target.value;
    this.input = query;

    let matchSpaces: any = query.match(/\s*/);
    if (matchSpaces[0] === query) {
      this.productsNames = [];
      this.hasQuery = false;
      return;
    }

    this._postsService.searchProducts(query.trim()).subscribe((results) => {
      this.productsNames = results;
      this.hasQuery = true;
    });
  }

  getItemFromBackend(itemName: string) {
    this._getsService.getProductByName(itemName).subscribe({
      next: (result) => {
        this.cart.push(result);
        this._cartDataService.sendCart(this.cart);
        console.log(result);
      },
      error: (error) => (this.productError = error),
    });
  }

  //TODO: Fix bug! sends req to backend with % for some reason
  addItemToCart(event: any) {
    // for <input> element
    // const itemName: string = event.target.value;
    // for <p> element
    const itemName: string = event.target.textContent;
    this.getItemFromBackend(itemName);
  }
}
