import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { products } from '../products';
import { CartService } from '../cart.service';
import { Product } from '../../types/products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => {
        this.product = products[params.get('productId')];
      }
    );
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    window.alert('Your product has benn added to the cart!');
  }

}
