import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css']
})
export class MyComponent implements OnInit {
  nameChangeLog: string[] = [];
  heroForm: FormGroup = this.formBuilder.group({
    name: [''],
  });

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.logNameChange();
    setInterval(() => console.log(this.nameChangeLog), 1000);
  }

  logNameChange(): void {
    const nameControl = this.heroForm.get('name');
    nameControl.valueChanges.forEach((value: string) => this.nameChangeLog.push(value));
  }
}
