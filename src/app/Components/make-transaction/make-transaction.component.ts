import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionsService } from '../../Services/Transactions/transactions.service';

@Component({
  selector: 'app-make-transaction',
  standalone: true,
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './make-transaction.component.html',
  styleUrl: './make-transaction.component.css'
})
export class MakeTransactionComponent implements OnInit {
  transactionForm: FormGroup;

     products  = [
      {"id": '76f22036-b23b-45bc-5ff7-08dcf5e79e6f' , "productName" : "product A" ,"price": 10 ,"unit" : "Kilograms" , "InitialQuantity" : 5 , "CurrentQuantity" : 12 },
      {"id": 'c8a98f33-52b0-4b8f-5ff6-08dcf5e79e6f' , "productName" : "product B" ,"price": 10 , "unit" : "Kilograms" , "InitialQuantity" : 5 , "CurrentQuantity" : 12 },
      {"id": 'e66a9928-d72b-4528-5ff5-08dcf5e79e6f' , "productName" : "product C" ,"price": 10 , "unit" : "Kilograms" , "InitialQuantity" : 5 , "CurrentQuantity" : 12 },
      {"id": 1 , "productName" : "product D" ,"price": 10 , "unit" : "Kilograms" , "InitialQuantity" : 5 , "CurrentQuantity" : 12 }
     ] 

  constructor(private fb: FormBuilder , private transactionService : TransactionsService ) {
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
    const selectedProduct = this.products.find(p => p.id === this.transactionForm.value.productName);
    if (selectedProduct) {
      this.transactionForm.patchValue({ unit: selectedProduct.unit });
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    const quantity = this.transactionForm.value.quantity;
    const selectedProduct = this.products.find(p => p.id === this.transactionForm.value.productName);
    if (selectedProduct && quantity) {
      this.transactionForm.patchValue({ totalPrice: selectedProduct.price * quantity });
    }
  }

  // recordTransaction() {
  //   if (this.transactionForm.valid) {
  //     const transactionData = { ...this.transactionForm.value };
  //     transactionData.productName = this.transactionForm.value.productName as string;
  //     this.transactionService.
  //     addTransaction( this.transactionForm.value)
  //     .subscribe({
  //       next : (response : any) =>{
  //         console.log('Product Name ' , this.transactionForm.value.productName , response)
  //       } ,
  //       error : ( error : any ) => console.error(error)
  //     });
  //   }
  recordTransaction() {
    if (this.transactionForm.valid) {
      // Clone the form data to modify it before sending
      const transactionData = { ...this.transactionForm.value };
      
      // Convert productName to a GUID format if it's a string
      transactionData.productName = this.transactionForm.value.productName as string;
  
      this.transactionService.addTransaction(transactionData).subscribe({
        next: (response: any) => {
          console.log('Transaction recorded successfully:', response);
        },
        error: (error: any) => console.error('Error recording transaction:', error),
      });
    }
  }
  
  }


