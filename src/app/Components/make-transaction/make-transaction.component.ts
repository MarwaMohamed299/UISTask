import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-make-transaction',
  standalone: true,
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './make-transaction.component.html',
  styleUrl: './make-transaction.component.css'
})
export class MakeTransactionComponent implements OnInit {
  transactionForm: FormGroup;
  products: any[] = []; // This should be populated with your product data

  constructor(private fb: FormBuilder) {
    this.transactionForm = this.fb.group({
      productName: ['', Validators.required],
      quantity: ['', Validators.required],
      date: ['', Validators.required],
      unit: [{ value: '', disabled: true }, Validators.required],
      totalPrice: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    // Call your service to fetch products
    // For example: this.products = this.productService.getProducts();
  }

  onProductChange() {
    const selectedProduct = this.products.find(p => p.name === this.transactionForm.value.productName);
    if (selectedProduct) {
      this.transactionForm.patchValue({ unit: selectedProduct.unit });
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    const quantity = this.transactionForm.value.quantity;
    const selectedProduct = this.products.find(p => p.name === this.transactionForm.value.productName);
    if (selectedProduct && quantity) {
      this.transactionForm.patchValue({ totalPrice: selectedProduct.price * quantity });
    }
  }

  recordTransaction() {
    if (this.transactionForm.valid) {
      // Save the transaction to the database
      // For example: this.transactionService.saveTransaction(this.transactionForm.value);
    }
  }
}

