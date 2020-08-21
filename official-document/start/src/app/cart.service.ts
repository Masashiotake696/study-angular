import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Products, Product } from '../types/products';
import { ShippingPrices } from '../types/shipping';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Products = [];

  constructor(private http: HttpClient) { }

  addToCart(product: Product): void {
    this.items.push(product);
  }

  getItems(): Products {
    return this.items;
  }

  clearCart(): Products {
    this.items = [];
    return this.items;
  }

  getShippingPrices(): Observable<ShippingPrices> {
    return this.http.get<ShippingPrices>('/assets/shipping.json');
  }
}
