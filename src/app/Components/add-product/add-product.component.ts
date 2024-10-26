import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { ProductsService } from '../../Services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { productReadDto } from '../../Models/ProductReadDto';


@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule , NgxPaginationModule,HttpClientModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  totalCount = 0;
  page = 1;
  items: productReadDto[] = [];
  CountPerPage = 10;
  productName : string ='';
  price : number = 0 ;

  ngOnInit(): void {
    this.GetProducts(1);
  }
  
  constructor( private productService : ProductsService) {
    
  }
  GetProducts(page: number) {
    console.log('Page Change Event:', page);
    this.productService
      .GetAllProducts(page, this.CountPerPage )
      .subscribe((data) => {
        console.log('Data received:', data);  
        this.totalCount = data.totalCount;
        this.items = data.products;
        this.page = page;
        console.log(data.products);
        console.log(data.totalCount)
      });
  }
}
