import { Product } from '../product.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  mode = true;
  private productId: string;
  product: Product;
  errors: string[] = [];
  constructor(public productService: ProductsService, public route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.productId = paramMap.get('id');
        this.mode = false;
        this.productService.getProduct(this.productId)
          .subscribe((product) => {
            this.product = product;
          });

      } else {
        this.mode = true;
      }

    });
  }
  onCreateProduct(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode) {
      const newProduct: Product = {
        name: form.value.name,
        type: form.value.type,
        description: form.value.description,
        ingredient1: form.value.ingredient1,
        ingredient2: form.value.ingredient2,
        ingredient3: form.value.ingredient3
      };
      console.log(newProduct);
      this.productService.addProduct(newProduct)
        .subscribe(() => this.router.navigateByUrl('/recipes'),
          error => {
            console.log(error);
            this.errors = error.error.errors;
          });
    } else {
      this.productService.updateProduct({
        _id: this.product._id,
        name: form.value.name,
        type: form.value.type,
        description: form.value.description,
        ingredient1: form.value.ingredient1,
        ingredient2: form.value.ingredient2,
        ingredient3: form.value.ingredient3,
        likes: form.value.likes
      }).subscribe(() => this.router.navigateByUrl('/recipes'),
        error => {
          console.log(error);
          this.errors = error.error.errors;
        });
    }
    form.resetForm();

  }
  onFormReset(form: NgForm) {
    form.resetForm();
    this.router.navigateByUrl('/recipes');
  }

}
