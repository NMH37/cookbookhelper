import { DetailsComponent } from './products/details/details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './products/product-list/product-list.component';
import { CreateProductComponent } from './products/create-product/create-product.component';


const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', component: ProductListComponent },
  { path: 'recipes/new', component: CreateProductComponent },
  { path: 'recipes/:id', component: DetailsComponent },
  { path: 'recipes/:id/edit', component: CreateProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

