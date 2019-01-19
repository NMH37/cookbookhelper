import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductsService } from './../../services/products.service';
import { Product } from './../product.model';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  product: Product;
  productId: string;
  like = false;
  errors: string[] = [];
  likes = 0;
  constructor(public productService: ProductsService, private route: ActivatedRoute, private router: Router) { }
  onDelete(productId: string) {
    this.productService.deleteProduct(productId);
    this.router.navigate(['/pets']);

  }
  onLike(productId: string) {
    this.like = !this.like;
    if (this.product.likes) {
      this.product.likes++;
    } else {
      this.product.likes = 1;
    }
    // this.likes = this.product.likes;
    this.productService.getProduct(productId).subscribe(productLiked => {
      this.product.likes = productLiked.likes + 1;
      productLiked.likes = productLiked.likes + 1;
      this.productService.updateProduct(productLiked).subscribe(() => this.router.navigateByUrl('/pets/' + productLiked._id),
        error => {
          console.log(error);
          this.errors = error.error.errors;
        });
    });
  }
  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.productId = paramMap.get('id');
        this.productService.getProduct(this.productId)
          .subscribe((product: Product) => {
            this.product = product;
          });
      }

    });
  }
}
