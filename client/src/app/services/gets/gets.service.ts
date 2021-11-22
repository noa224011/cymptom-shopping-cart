import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { IProduct } from 'src/app/interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class GetsService {
  constructor(private http: HttpClient) {}

  getProductByName(productName: string) {
    return this.http
      .get<{ product: IProduct }>(
        `${environment.baseUrl}getProduct/${productName}`
      )
      .pipe(map((data) => data.product));
  }
}