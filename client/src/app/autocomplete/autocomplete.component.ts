import { Component, HostListener, OnInit, ElementRef } from '@angular/core';
import { PostsService } from '../services/posts/posts.service';
import { GetsService } from '../services/gets/gets.service';
import { IProduct } from '../interfaces/IProduct';
import { CartDataService } from '../services/cart-data/cart-data.service';
import { LocalStorageService } from '../services/local-storage/local-storage-service.service';
import { ToastrService } from 'ngx-toastr';
import { scrollToElement } from '../helpers/scroll';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  productsNames: Array<IProduct> = [];
  cart: Array<IProduct> = [];
  cursor: number = -1;
  input: string = '';
  valueInput: string | null | undefined = '';
  hasQuery: Boolean = false;
  doesSearch: Boolean = true;
  isSearched: Boolean = false;
  productError: any = '';
  activeItem: string | null | undefined = '';

  constructor(
    private _postsService: PostsService,
    private _getsService: GetsService,
    private _cartDataService: CartDataService,
    private _localStorageService: LocalStorageService,
    private _el: ElementRef,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const item = this._localStorageService.getInfo('cart');
    if (Object.keys(item).length === 0) return;
    this.cart = this._localStorageService.getInfo('cart');
    this._cartDataService.sendCart(this.cart);
  }

  sendInput(event: any) {
    if (!this.doesSearch) return;

    const query: string = event.target.value;
    this.input = query;
    this.activeItem = query;

    if (this.valueInput === '') {
      this.productsNames = [];
      this.hasQuery = false;
      this.cleanUp();
      return;
    }

    let matchSpaces: any = query.match(/\s*/);
    if (matchSpaces[0] === query) {
      this.productsNames = [];
      this.hasQuery = false;
      return;
    }

    this._postsService.searchProducts(query.trim()).subscribe((results) => {
      this.productsNames = results;
      this.isSearched = false;
      this.hasQuery = true;
    });
  }

  getItemFromBackend(itemName: string | null | undefined) {
    this._getsService.getProductByName(itemName?.trim()).subscribe({
      next: (result) => {
        this.cart.push(result);
        this._localStorageService.setInfo('cart', this.cart);
        this._cartDataService.sendCart(this.cart);
      },
      error: (error) => {
        this.productError = error;
        this.showError();
        this.isSearched = true;
      },
    });
  }

  showError() {
    this._toastr.error('Error', 'Item not found', {
      closeButton: true,
      progressAnimation: 'increasing',
    });
  }

  addItemToCartByEnter() {
    this.getItemFromBackend(this.activeItem);
    this.cleanUp();
  }

  addItemToCartByClick(event: any) {
    this.getItemFromBackend(event.target.textContent);
    this.cleanUp();
  }

  addItemToCartByButtonClick() {
    this.getItemFromBackend(this.valueInput);
    this.cleanUp();
  }

  cleanUp() {
    this.valueInput = '';
    this.isSearched = true;
    this.cursor = -1;
    this.doesSearch = true;
  }

  getItemAt = (index: number) => {
    return document.querySelector(`#autocomplete-result-${index}`)?.textContent;
  };

  renderSelectedItemOnInput() {
    this.activeItem = this.getItemAt(this.cursor);
    this.valueInput = this.activeItem;
  }

  scrollToSelecetedProduct(index: number) {
    const scrollElement: any = '.results-container';
    const element: any = `#autocomplete-result-${index}`;

    scrollToElement(scrollElement, element);
  }

  @HostListener('window:keyup.arrowup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (this.cursor > 0) {
      this.cursor -= 1;
      this.handleArrowsPress();
    }
  }

  @HostListener('window:keyup.arrowdown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.cursor < this.productsNames.length - 1) {
      this.cursor += 1;
      this.handleArrowsPress();
    }
  }

  handleArrowsPress() {
    this.renderSelectedItemOnInput();
    this.scrollToSelecetedProduct(this.cursor);
    this.doesSearch = false;
  }

  // When clicking outside of the component, clean the input
  @HostListener('document:click', ['$event'])
  clickout(event: { target: any }) {
    if (!this._el.nativeElement.contains(event.target)) {
      this.cleanUp();
    }
  }
}
