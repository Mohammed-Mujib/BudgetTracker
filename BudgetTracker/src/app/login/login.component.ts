import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router, RouterLink } from '@angular/router';
import { log } from 'node:console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb:FormBuilder,private _DataService:DataService, private _Router:Router){}

  ngOnInit(): void {
    this._DataService.checkUserExist()
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  checkUser(): void {
    this._DataService.user().subscribe(
      response => {
        console.log("User data:", response);
        this._DataService.userData.next(response);
        this._DataService.isLogined.next(true);
        this._Router.navigate(['transactions']);

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
            this.checkUser()
          },
          error => {
            console.error('login error:', error);
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
