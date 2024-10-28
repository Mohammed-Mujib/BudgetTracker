import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor( private _DataService:DataService, private _Router: Router){}

  ngOnInit(): void {
    this._DataService.checkUserExist()
  }

}
