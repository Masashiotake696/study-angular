import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CustomersRoutingModule } from './customers-routing.module';

import { CustomersComponent } from './customers/customers.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersDetailComponent } from './customers-detail/customers-detail.component';

import { CustomersService } from './customers.service';
import { GreetingModule } from '../greeting/greeting.module';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomersListComponent,
    CustomersDetailComponent
  ],
  imports: [
    SharedModule,
    CustomersRoutingModule,
    // GreetingModule // Error: GreetingModule is already loaded. Import it in the AppModule only
  ],
  providers: [
    CustomersService
  ]
})
export class CustomersModule { }
