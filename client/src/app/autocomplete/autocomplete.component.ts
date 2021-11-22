import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts/posts.service';
import { GetsService } from '../services/gets/gets.service';
import { IProduct } from '../interfaces/IProduct';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
})
export class AutocompleteComponent implements OnInit {
  productsNames: Array<IProduct> = [];
  input: string = '';
  hasQuery: Boolean = false;

  constructor(
    private postsService: PostsService,
    private getsService: GetsService
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

    this.postsService.searchProducts(query.trim()).subscribe((results) => {
      this.productsNames = results;
      this.hasQuery = true;
    });
  }

  getInputProduct() {
    this.getsService.getProductByName(this.input).subscribe((result) => {
      console.log(result);
    });
  }
}
