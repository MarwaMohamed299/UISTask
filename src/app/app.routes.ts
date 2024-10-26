import { Routes } from '@angular/router';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { AddProductFormComponent } from './Components/add-product-form/add-product-form.component';
import { MakeTransactionComponent } from './Components/make-transaction/make-transaction.component';

export const routes: Routes = [
    { path: '', component: AddProductComponent },
    { path: 'addProduct', component: AddProductFormComponent },
    { path: 'makeTransaction', component: MakeTransactionComponent },


];
