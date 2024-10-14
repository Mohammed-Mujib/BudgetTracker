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
export class HomeComponent implements OnInit {

  constructor(private fb: FormBuilder, private _DataService: DataService, private _Router: Router) {}
  auth:boolean= false;
  user:any;
  // transactionForm!: FormGroup;
  transactionForm = new FormGroup({
      name : new FormControl(null,[Validators.required]),
      type : new FormControl(null,[Validators.required]),
      amount: new FormControl(0,[Validators.required,Validators.min(0)]),
      category: new FormControl(null,[Validators.required])
    });
  ngOnInit(): void {

    // this.transactionForm = this.fb.group({
    //   name:['',Validators.required],
    //   type:['',Validators.required],
    //   amount:[0,Validators.required, Validators.min(0)],
    //   category:['',Validators.required]
    //   });
    // this.checkUser();
  // this.auth=this._DataService.isLogined.value
  // this.user = this._DataService.userData
  this._DataService.isLogined.subscribe(
      v => {this.auth = v;}
        );
  this._DataService.userData.subscribe(
      data => {this.user = data}
    );
  }
  types:string[] =[
    "expense","income"
    ];
  expense_categOries: string[] = [
    'bills','transportation','clothes','education',
    'fitness','gifts','food',
    'health','furniture','pet',
    'shopping','travel','others'
  ];

  income_categOries: string[] = [
    'allowance','awards','bonus',
    'investment','lottery','salary',
    'tips','others'
  ];
  checkUser(): void {
    this._DataService.user().subscribe(
      response => {
        console.log("User data:", response);
        this.user =response
        this.auth = true;
      },
      error => {
        console.error("Error fetching user data:", error);
          this.auth=false;
      }
    );
  }
  onSubmit():void{
    if(this.transactionForm.valid){
      console.log(this.transactionForm.value);
      this._DataService.createTransaction(this.transactionForm.value).subscribe(
        response => {
          console.log("transaction comleated",response);
        },
        error => {
          console.log("transaction falild",error);
        }
      );
    }
  }
  transactions:any[] =[
      {
        amount:"700",
        staut:"expense",
        category:"bills",

      },
  ]

}
