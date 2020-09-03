import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Contact, ContactService } from './contact.service';
import { UserService } from '../greeting/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contact: Contact;
  contacts: Contact[];

  message = 'Loading contacts ...';
  userName = '';

  contactFormGroup: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(
    private contactService: ContactService,
    userService: UserService,
    private formBuilder: FormBuilder,
  ) {
    this.userName = userService.userName;
  }

  ngOnInit(): void {
    this.setupForm();
  }

  setupForm(): void {
    this.contactService.getContacts().subscribe(contacts => {
      this.message = '';
      this.contacts = contacts;
      this.contact = contacts[0];
      this.name.setValue(this.contact.name);
    });
  }

  next(): void {
    let index = 1 + this.contacts.indexOf(this.contact);
    if (index >= this.contacts.length) {
      index = 0;
    }
    this.contact = this.contacts[index];
    this.name.setValue(this.contact.name);
    console.log(this.contacts[index]);
  }

  onSubmit(): void {
    const newName = this.name.value;
    this.displayMessage(`Saved ${newName}`);
    this.contact.name = newName;
  }

  newContact(): void {
    this.displayMessage('New Contact');
    this.name.setValue('test');
    this.contact = { id: 42, name: 'test' };
    this.contacts.push(this.contact);
  }

  displayMessage(message: string): void {
    this.message = message;
    setTimeout(() => this.message = '', 1500);
  }

  get name(): FormControl {
    return this.contactFormGroup.get('name') as FormControl;
  }

}
