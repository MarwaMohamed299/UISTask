import { ProductTransaction } from "./ProductTransaction";

export interface TransactionReadDto {
    id: string;  
    date: string;  
    productTransactions: ProductTransaction[];  
  }
  