import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: ['./profile-editor.component.css']
})
export class ProfileEditorComponent {
  constructor(private formBuilder: FormBuilder) { }

  // -- FormControlを使用したフォームの作成 --
  // profileForm = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     zip: new FormControl(''),
  //   })
  // });

  // -- FormBuilderを使用したフォームの作成 --
  profileForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
    }),
    // フォーム配列（事前にこの値の数がわからない場合に使用する）
    aliases: this.formBuilder.array([
      this.formBuilder.control('')
    ])
  });

  get aliases(): FormArray {
    return this.profileForm.get('aliases') as FormArray;
  }

  addAlias(): void {
    this.aliases.push(this.formBuilder.control(''));
  }

  onSubmit(): void {
    console.log(this.profileForm.value);
  }

  updateProfile(): void {
    // setValue()を使用してデータモデルを更新する場合は全てのコントロールに新しい値を設定する必要がある（全部更新）
    // this.profileForm.setValue({
    //   firstName: 'Taro',
    //   lastName: 'Yamada',
    //   address: {
    //     street: 'xxx street',
    //     city: 'xxx city',
    //     state: 'xxx state',
    //     zip: 'XXX-XXX',
    //   }
    // });

    // patchValue()を使用してデータモデルを更新する場合は一部のコントロールを新しい値に設定できる（一部更新）
    this.profileForm.patchValue({
      firstName: 'Nancy',
      address: {
        street: 'xxx street'
      }
    });
  }
}
