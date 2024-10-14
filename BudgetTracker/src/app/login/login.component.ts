import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb:FormBuilder,private _DataService:DataService, private _Router:Router){}

  ngOnInit(): void {
    // Initialize the form group
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  //added
  checkUser(): void {
    this._DataService.user().subscribe(
      response => {
        console.log("User data:", response);
        this._DataService.userData.next(response);
        this._DataService.isLogined.next(true);
      },
      error => {
        console.error("Error fetching user data:", error);
        this._DataService.isLogined.next(false);
      }
    );
  }
  onSubmit(): void {
      if (this.loginForm.valid) {
        console.log(this.loginForm.value);
        this._DataService.login(this.loginForm.value).subscribe(
          response => {
            console.log(`user logined:`, response);
            this.checkUser() // added
            this._Router.navigate(['home']);
        },
        error => {
          console.error('login error:', error);
        }
      );
      }
    }
}