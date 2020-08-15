import { Component } from '@angular/core'
import { UseService } from './use.service'

@Component({
  selector: 'my-parent2',
  providers: [
    UseService
  ],
  template: `
    <h2>Parent2Component</h2>
    <my-child2></my-child2>
  `
})
export class Parent2Component {}
