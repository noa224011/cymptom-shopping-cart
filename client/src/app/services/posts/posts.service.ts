import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IProduct } from 'src/app/interfaces/IProduct';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
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
}
