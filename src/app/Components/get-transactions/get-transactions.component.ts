import { Component, NgModule, OnInit } from '@angular/core';
import { TransactionsService } from '../../Services/Transactions/transactions.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { TransactionReadDto } from '../../Models/TransactionsDtos/TransactionReadDto';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductTransaction } from '../../Models/TransactionsDtos/ProductTransaction';

@Component({
  selector: 'app-get-transactions',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule,
    FormsModule,
  ],
  templateUrl: './get-transactions.component.html',
  styleUrls: ['./get-transactions.component.css'],
})
export class GetTransactionsComponent implements OnInit {
  transactions: TransactionReadDto[] = [];
  totalCount: number = 0;
  date: string = '';
  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    const formattedDate = this.date
      ? new Date(this.date).toISOString()
      : undefined;

    this.transactionsService
      .getAllTransactions(1, 100, formattedDate)
      .subscribe(
        (response) => {
          this.transactions = response.transactions;
          this.totalCount = response.totalCount;
        },
        (error) => {
          console.error('Error fetching transactions:', error);
        }
      );
  }
}
