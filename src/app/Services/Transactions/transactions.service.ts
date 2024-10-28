import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionAddDto } from '../../Models/TransactionsDtos/TransactionAddDto';
import { Observable } from 'rxjs';
import { TransactionReadDto } from '../../Models/TransactionsDtos/TransactionReadDto';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private httpClient : HttpClient) { }

  private  Base_URL = "https://localhost:7141/api/Transactions/" 

  addTransaction(newTransaction: TransactionAddDto): Observable<TransactionAddDto> {
    return this.httpClient.post<TransactionAddDto>('https://localhost:7141/api/Transactions/', newTransaction);
}


  getAllTransactions(page: number, pageSize: number, filterDate?: string): Observable<{ transactions: TransactionReadDto[], totalCount: number }> {
    let url = `https://localhost:7141/api/Transactions/by-date?pageNumber=${page}&pageSize=${pageSize}`;
    if (filterDate) {
      url += `&date=${encodeURIComponent(filterDate)}`;
    }
    return this.httpClient.get<{ transactions: TransactionReadDto[], totalCount: number }>(url);
  }
  
}
