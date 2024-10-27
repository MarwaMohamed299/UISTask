import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionAddDto } from '../../Models/TransactionsDtos/TransactionAddDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private httpClient : HttpClient) { }

  private  Base_URL = "https://localhost:7141/api/Transactions/" 

  addTransaction(newTransaction : TransactionAddDto) : Observable<TransactionAddDto>{
    return this.httpClient.post<TransactionAddDto>(this.Base_URL , newTransaction )
  }
}
