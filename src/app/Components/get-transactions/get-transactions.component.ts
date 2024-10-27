import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../Services/Transactions/transactions.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransactionReadDto } from '../../Models/TransactionsDtos/TransactionReadDto';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductTransaction } from '../../Models/TransactionsDtos/ProductTransaction';

@Component({
  selector: 'app-get-transactions',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgxPaginationModule],
  templateUrl: './get-transactions.component.html',
  styleUrls: ['./get-transactions.component.css'] // Fixed to `styleUrls`
})
export class GetTransactionsComponent implements OnInit {
  filterForm: FormGroup;
  transactions: Array<{
    productName: string;
    quantity: number;
    unit: string;
    totalPrice: number;
    date: string;
  }> = []; // Updated to a more suitable type
  currentPage = 1;
  itemsPerPage = 10;
  totalCount = 0;

  constructor(private fb: FormBuilder, private transactionService: TransactionsService) {
    this.filterForm = this.fb.group({
      filterDate: [''],
    });
  }

  ngOnInit() {
    this.fetchTransactions();
  }

  onFilter() {
    this.currentPage = 1; 
    this.fetchTransactions();
  }
  formatDate(date: string): string {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD
}

fetchTransactions() {
  const filterDateValue = this.filterForm.value.filterDate ? this.formatDate(this.filterForm.value.filterDate) : undefined;
  
  console.log('Filter Date:', filterDateValue);

  this.transactionService.getAllTransactions(this.currentPage, this.itemsPerPage, filterDateValue).subscribe(
      (response) => {
          console.log(response);

          this.transactions = response.transactions.flatMap((transaction: TransactionReadDto) =>
              transaction.productTransactions.map((product: ProductTransaction) => ({
                  productName: product.productId, 
                  quantity: product.quantity,
                  unit: 'kg', 
                  totalPrice: product.totalPrice,
                  date: new Date(transaction.date).toLocaleDateString() 
              }))
          );

          this.totalCount = response.totalCount; 
      },
      (error) => {
          console.error('Error fetching transactions', error);
      }
  );
}

}
