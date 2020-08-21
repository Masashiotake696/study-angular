import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CartService } from '../cart.service';
import { ShippingPrices } from '../../types/shipping';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  shippingCosts: Observable<ShippingPrices>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.shippingCosts = this.cartService.getShippingPrices();
  }

}
