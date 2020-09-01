import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-comp-with-host-binding',
  template: '<p>I am a component!</p>',
})
export class CompWithHostBindingComponent implements OnInit {
  @HostBinding('class.big') isBig = false;
  @HostBinding('style.color') color = 'green';
  @HostBinding('style.width') width = '200px';

  constructor() { }

  ngOnInit(): void {
  }

}
