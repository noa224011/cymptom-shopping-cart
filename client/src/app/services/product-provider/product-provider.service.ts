import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProduct } from 'src/app/interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductProviderService {
  constructor(private http: HttpClient) {}

  searchProducts(query: string) {
    return this.http
      .post<{ searchQuery: Array<IProduct> }>(
        `${environment.baseUrl}autocomplete`,
        { searchQuery: query },
        {
          headers: new HttpHeaders({ 'Context-type': 'application/json' }),
        }
      )
      .pipe(map((data) => data.searchQuery));
  }

  getProductByName(productName: string) {
    return this.http
      .get<{ product: IProduct }>(
        `${environment.baseUrl}getProduct/${productName?.trim()}`
      )
      .pipe(map((data) => data.product));
  }

  getProductById(sku: number) {
    return this.http
      .get<{ product: IProduct }>(
        `${environment.baseUrl}getProduct/byId/${sku}`
      )
      .pipe(map((data) => data.product));
  }
}
