import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { error } from 'console';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, FormsModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent {
  constructor(private fb: FormBuilder, private _DataService: DataService, private _Router: Router) {}
  auth:boolean= false;
  user:any;
  // transactions:object[] =[];
  transactions:Transaction[] =[];
  isExpense:boolean=true;
  categories:string[]=[];
  balance:number=0;
  formvisable:boolean=false
  // transactionForm!: FormGroup;
  transactionForm = new FormGroup({
      name : new FormControl(null,[Validators.required]),
      transaction_type : new FormControl("",[Validators.required]),
      amount: new FormControl(null,[Validators.required,Validators.min(0)]),
      category: new FormControl(null,[Validators.required])
    });
  ngOnInit(): void {
    this._DataService.checkUserExist()
    this._DataService.isLogined.subscribe(
        v => {this.auth = v;}
          );
    this._DataService.userData.subscribe(
        data => {this.user = data}
      );
    if (!this.auth) {
        this._Router.navigate(['login']);
      } else {
        this.loadTransactions();
      }
    this.changToExpense();

  }

  expense_categories: string[] = [
    'bills','transportation','clothes','education',
    'fitness','gifts','food',
    'health','furniture','pet',
    'shopping','travel','others'
  ];

  income_categories: string[] = [
    'allowance','awards','bonus',
    'investment','lottery','salary',
    'tips','others'
  ];

  //submit function that validate the data and sen it ti the server and load it again from teh server
  onSubmit():void{
    if(this.transactionForm.valid){
      console.log(this.transactionForm.value);
      this._DataService.createTransaction(this.transactionForm.value).subscribe(
        response => {
          console.log("transaction comleated",response);
          this.transactionForm.reset();
          this.loadTransactions()
        },
        error => {
          console.log("transaction falild",error);
        }
      );
    }
  else{
    console.log("transaction is not valid",this.transactionForm.value);
    }
  }
  countBalance(oparetions:Transaction[]):void{
    this.balance = 0;
    for(let op of oparetions){
      if(op.transaction_type =="income" ){
          this.balance = (Number(this.balance) + Number(op.amount))
      } else{
          this.balance = (Number(this.balance) - Number(op.amount))
      }
    }
  }
  // get the user transactions from the server
  loadTransactions():void{
    this._DataService.getTransactions().subscribe(
      response => {
        // console.log("my transactions",response);
        this.transactions = response;
        console.log("my transactions",this.transactions);
        this.countBalance(this.transactions);
      },
      error => {console.log("my transactions",error)}
    );
  }
  // change the transaction stauts to expense
  changToExpense():void{
    this.isExpense = true;
    this.transactionForm.patchValue({transaction_type: "expense"});
    this.categories = this.expense_categories;
  }
  // change the transaction stauts to income
  changToIncome():void{
    this.isExpense = false;
    this.transactionForm.patchValue({transaction_type: "income"});
    this.categories = this.income_categories
  }
  date(dt:any):any[] {
    let mydate =  new Date(dt * 1000);
    let weekday = mydate.toLocaleString("default", { weekday: "long" });
    let monthday = mydate.getDate();
    let month = mydate.toLocaleString("default", { month: "long" });
    return [weekday,month,monthday];
  }
  showform():void{
    this.formvisable = !this.formvisable
  }
}
