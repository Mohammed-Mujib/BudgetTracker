import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;  // Use definite assignment assertion

  constructor(private fb: FormBuilder, private _DataService:DataService, private _Router:Router) {}

  ngOnInit(): void {
    // Initialize the form group
    this._DataService.checkUserExist()
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this._DataService.register(this.registerForm.value).subscribe(
        response => {
          console.log(`user registered:`, response);
          this._Router.navigate(['login']);
      },
      error => {
        console.error('register error:', error);
      }
    );
    }
  }

  inputType = "password";
  see:boolean = false;
  showPassword():void{
    this.see = !this.see;
    this.inputType = this.see ? 'text' : 'password';
  }

}
