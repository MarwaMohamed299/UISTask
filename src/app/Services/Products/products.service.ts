import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productPaginationDto  } from '../../Models/ProductsDtos/ProductPaginationDto';
import { productAddDto } from '../../Models/ProductsDtos/ProductAddDto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private httpClient : HttpClient) { }

  private Base_URL = 'https://localhost:7141/api/Products/';

  GetAllProducts(page:number,countPerPage:number):Observable<productPaginationDto>{

    return this.httpClient.get<productPaginationDto>(`https://localhost:7141/api/Products?pageNumber=${page}&pageSize=${countPerPage}`);
   }

   
   add(newProduct: productAddDto): Observable<productAddDto> {
    return this.httpClient.post<productAddDto>(this.Base_URL, newProduct);
  }
}
