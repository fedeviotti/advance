import { Injectable } from '@angular/core';
import { ProductDto } from '../models/ProductDto';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService {

  constructor(private _http: HttpClient) { }


  public async getAll(skip: number=0, take: number=30): Promise<Array<ProductDto>>{

    //chiamata alle REST API
    return this._http.get<Array<ProductDto>>(environment.API_URL + `product/find?skip=${skip}&take=${take}`)
                         .toPromise();

      }

}
