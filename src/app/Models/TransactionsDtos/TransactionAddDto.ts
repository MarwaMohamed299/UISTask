import { ProductTransactionAddDto } from "./ProductTransactionAddDto";

export class TransactionAddDto{
    id: string =''; 
    date: Date = new Date();
    productTransactions: ProductTransactionAddDto[] =[];
}