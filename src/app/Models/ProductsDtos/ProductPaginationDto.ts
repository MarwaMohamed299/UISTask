import { productReadDto } from "./ProductReadDto";

export class productPaginationDto {
    products: productReadDto[] = [];
    totalCount: number = 0;
  }