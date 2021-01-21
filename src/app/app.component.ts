import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatePassword } from './match-password/validate-password';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cities = ['İstanbul', 'İzmir', 'Ankara', 'Aydın', 'Bursa', 'Mersin'];
  registerForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(3)]],
        lastName: ['', [Validators.required, Validators.minLength(3)]],
      }),
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      address: this.fb.group({
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
      }),
      gender: ['male'],
      passwordValidation: this.fb.group(
        {
          password: ['', [Validators.required]],
          confirmPassword: ['', [Validators.required]],
        },
        { validator: ValidatePassword.MatchPassword }
      ),
      addDynamicElement: this.fb.array([]),
    });
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      alert('Please fill all the blanks to register.');
    } else {
      this.submitted = true;
      console.log(this.registerForm);
    }
  }
  
  /* getter method to access formcontrols
  get myForm() {
    return this.registerForm.controls;
  }
  Not: I couldn't access controls in html that's why I didn't use this way.
  */

  get dynamicArray() {
    return this.registerForm.get('addDynamicElement') as FormArray;
  }

  addFamilyMembers() {
    this.dynamicArray.push(this.fb.control(''));
  }
}
