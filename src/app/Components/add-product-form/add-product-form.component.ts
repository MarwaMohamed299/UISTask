import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product-form',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule ],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.css'
})
export class AddProductFormComponent {
  productaddForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private productService: ProductsService) {
    this.productaddForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      unit: ['', [Validators.required]], 
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      initialQuantity: ['', [Validators.required]],

    });
  }

 

  add() {
    if (this.productaddForm.valid) {
 
      this.productService.add(this.productaddForm.value).subscribe({
        next: (response: any) => {
          console.log('Product Added:', response);
        },
        error: (err: any) => console.error(err),
      });
    }
  }
}
