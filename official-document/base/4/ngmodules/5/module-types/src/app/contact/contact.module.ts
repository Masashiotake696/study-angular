import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ContactRoutingModule } from './contact-routing.module';

import { ContactComponent } from './contact.component';
import { ContactService } from './contact.service';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    ContactRoutingModule,
    SharedModule,
  ],
  providers: [ ContactService ]
})
export class ContactModule { }
