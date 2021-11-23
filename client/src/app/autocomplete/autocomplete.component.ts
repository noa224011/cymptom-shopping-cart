import {
  Component,
  HostListener,
  OnInit,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { PostsService } from '../services/posts/posts.service';
import { GetsService } from '../services/gets/gets.service';
import { IProduct } from '../interfaces/IProduct';
import { CartDataService } from '../services/cart-data/cart-data.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements AfterViewInit, OnInit {
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
  inputRef!: HTMLInputElement;

  constructor(
    private _postsService: PostsService,
    private _getsService: GetsService,
    private _cartDataService: CartDataService,
    private _el: ElementRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    const input: HTMLInputElement = this._el.nativeElement as HTMLInputElement;
    this.inputRef = input;
  }

  sendInput(event: any) {
    if (!this.doesSearch) return;

    const query: string = event.target.value;
    this.input = query;
    this.activeItem = query;
    console.log(this.inputRef.textContent);

    if (this.inputRef.textContent === '') {
      console.log('is this happening?');
      this.productsNames = [];
      this.hasQuery = false;

      this.isSearched = true;
      this.cursor = -1;
      this.doesSearch = true;
      // this.cleanUp();
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
      this.hasQuery = true;
      this.isSearched = false;
    });
  }

  getItemFromBackend(itemName: string | null | undefined) {
    this._getsService.getProductByName(itemName).subscribe({
      next: (result) => {
        this.cart.push(result);
        this._cartDataService.sendCart(this.cart);
        console.log(result);
      },
      error: (error) => (this.productError = error),
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
    this.getItemFromBackend(this.valueInput?.trim());
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

  @HostListener('window:keyup.arrowup', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    if (this.cursor > 0) {
      this.cursor -= 1;
      this.renderSelectedItemOnInput();
      this.doesSearch = false;
    }
  }

  @HostListener('window:keyup.arrowdown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.cursor < this.productsNames.length - 1) {
      this.cursor += 1;
      this.renderSelectedItemOnInput();
      this.doesSearch = false;
    }
  }

  // When clicking outside of the component, clean the input
  @HostListener('document:click', ['$event'])
  clickout(event: { target: any }) {
    if (!this._el.nativeElement.contains(event.target)) {
      this.cleanUp();
    }
  }
}
