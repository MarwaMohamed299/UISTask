import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionsService } from '../../Services/Transactions/transactions.service';
import { TransactionAddDto } from '../../Models/TransactionsDtos/TransactionAddDto';
import { ProductTransactionAddDto } from '../../Models/TransactionsDtos/ProductTransactionAddDto';
import { ProductsService } from '../../Services/Products/products.service';
import { productReadDto } from '../../Models/ProductsDtos/ProductReadDto';
import { error } from 'console';

@Component({
  selector: 'app-make-transaction',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './make-transaction.component.html',
  styleUrls: ['./make-transaction.component.css']
})
export class MakeTransactionComponent implements OnInit {
  transactionForm: FormGroup;
  totalCount = 0;
  items: productReadDto[] = [];
  CountPerPage = 3 ;
  productss : productReadDto[] =[]
  // products = [
  //   { id: '7874CF2B-B47E-4DF2-B2C4-37C04FC03DD7', productName: "product A", price: 13, unit: "Kilograms", InitialQuantity: 5, CurrentQuantity: 12 },
  //   { id: '7874CF2B-B47E-4DF2-B2C4-37C04FC03DD7', productName: "product B", price: 10, unit: "Kilograms", InitialQuantity: 5, CurrentQuantity: 12 },
  //   { id: '31AC27D7-4C50-4DC7-8019-1A4E52A37853', productName: "product C", price: 10, unit: "Kilograms", InitialQuantity: 5, CurrentQuantity: 12 },
  //   { id: '1', productName: "product D", price: 10, unit: "Kilograms", InitialQuantity: 5, CurrentQuantity: 12 }
  // ];


  constructor(private fb: FormBuilder, private transactionService: TransactionsService , private producctService: ProductsService ) {
    this.transactionForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: ['', Validators.required],
      date: ['', Validators.required],
      unit: [{ value: '', disabled: true }, Validators.required],
      totalPrice: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchProducts(); 

    this.transactionForm.get('quantity')?.valueChanges.subscribe(() => this.calculateTotalPrice());
    this.transactionForm.get('productId')?.valueChanges.subscribe(() => this.onProductChange());
  }

  onProductChange() {
    const selectedProduct = this.productss.find(p => p.id === this.transactionForm.value.productId);
    if (selectedProduct) {
      this.transactionForm.patchValue({ unit: selectedProduct.unit });
      console.log('Unit set to:', selectedProduct.unit); // Debug log

      this.calculateTotalPrice(); 
    }
  }
  fetchProducts() {
    this.producctService.GetAllProducts(1, 10).subscribe({
      next: (response) => {
        this.productss = response.products;
        this.totalCount = response.totalCount;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
  }
  
  calculateTotalPrice(): void {
    const quantity = this.transactionForm.value.quantity;
    const selectedProduct = this.productss.find(p => p.id === this.transactionForm.value.productId);

    console.log('Selected Product:', selectedProduct);
    console.log('Quantity:', quantity);

    if (selectedProduct && quantity) {
      const totalPrice = selectedProduct.price * quantity;
      console.log('Calculated Total Price:', totalPrice); 

      this.transactionForm.patchValue({ totalPrice });
    } else {
      console.log('Total Price not calculated. Missing product or quantity.');
    }
  }
  recordTransaction() {
    if (this.transactionForm.valid) {
        console.log('Transaction Form Value:', this.transactionForm.value); // Log entire form value

        const productTransactionDto: ProductTransactionAddDto = {
            productId: this.transactionForm.value.productId,
            quantity: this.transactionForm.value.quantity,
            unit: this.transactionForm.value.unit, // Check if this is still undefined
            totalPrice: this.transactionForm.get('totalPrice')?.value
        };

        console.log('Product Transaction DTO:', productTransactionDto); // Log before sending to service
        
        const transactionDto: TransactionAddDto = {
            date: new Date(this.transactionForm.get('date')?.value).toISOString(),
            productTransactions: [productTransactionDto]
        };

        console.log('Transaction DTO:', transactionDto); 
        this.transactionService.addTransaction(transactionDto).subscribe({
            next: (response) => {
                console.log('Transaction recorded:', response);
            },
            error: (error) => {
                console.error('Error recording transaction:', error);
                console.error('Validation errors:', error.error.errors);
            }
        });
    }
}

}
