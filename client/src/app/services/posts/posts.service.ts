import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface IProducts {
  sku: number;
  name: string;
  type: string;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  searchProducts(query: string) {
    return this.http
      .post<{ searchQuery: string }>(
        '',
        { searchQuery: query },
        {
          headers: new HttpHeaders({ 'Context-type': 'application/json' }),
        }
      )
      .pipe(map((data) => data.searchQuery));
  }
}
