import { NgModel } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product: Product;
  productId: string;
  color = '';
  like = true;
  // indg: string[] = [];
  errors: string[] = [];
  likes = 0;
  ingredients: any[];
  selecteditems: any[];

  equals(objOne, objTwo) {
    if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined') {
      return objOne.id === objTwo.id;
    }
  }

  selectAll(select: NgModel, values, array) {
    select.update.emit(values);
  }

  deselectAll(select: NgModel) {
    select.update.emit([]);
  }
  constructor(public productService: ProductsService, private route: ActivatedRoute, private router: Router) { }
  onDelete(productId: string) {
    this.productService.deleteProduct(productId);
    this.router.navigate(['/recipes']);

  }
  onLike() {
    this.color = 'warn';
  }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.productId = paramMap.get('id');
        this.productService.getProduct(this.productId)
          .subscribe((product: Product) => {
            this.product = product;
            this.ingredients = [
              { id: 1, viewValue: this.product.ingredient1 },
              { id: 2, viewValue: this.product.ingredient2 },
              { id: 3, viewValue: this.product.ingredient3 },
            ];
          }
          );
      }

    });
  }

}
