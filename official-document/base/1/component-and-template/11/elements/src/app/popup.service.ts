import { Injectable, Injector, ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { PopupComponent } from './popup/popup.component';
import { NgElement, WithProperties } from '@angular/elements';

@Injectable()
export class PopupService {
  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  // Previous dynamic-loading method required you to set up infrastructure before adding the popup to DOM.
  showAsComponent(message: string): void {
    // Create element
    const popup = document.createElement('popup-component');

    // Create the component and write it up with the element
    const factory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
    const popupComponentRef = factory.create(this.injector, [], popup);
    const popupHostView = popupComponentRef.hostView;

    // Attach to the view so that the change detector knows tu run
    this.applicationRef.attachView(popupHostView);

    // Listen to the close event
    popupComponentRef.instance.closed.subscribe(() => {
      document.body.removeChild(popup);
      this.applicationRef.detachView(popupHostView);
    });

    // Set the message
    popupComponentRef.instance.message = message;

    // Add to the DOM
    document.body.appendChild(popup);
  }

  // This uses the new custom-element method to add the popup the DOM.
  showAsElement(message: string): void {
    // Create element
    const popupElement: NgElement & WithProperties<PopupComponent> = document.createElement('popup-element') as any;

    // Listen to the close event
    popupElement.addEventListener('closed', () => document.body.removeChild(popupElement));

    // Set the message
    popupElement.message = message;

    // Add to the DOM
    document.body.appendChild(popupElement);
  }
}
