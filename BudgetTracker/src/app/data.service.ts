import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private _HttpClient: HttpClient, private _Router:Router) {}


  checkUserExist():boolean{
    if(this.getCsrfToken()){
        // console.log(this.getCookie("sessionid="));
        // console.log("there is a user loged in ");
        this.isLogined.next(true);
        this.user().subscribe(
          response => {
            this.userData.next(response);
          });
        this._Router.navigate(['transactions']);
        return true;
    }
    else{
        console.log("no user is detected ")
        return false;
    }
  }

  getCookie(name:string): string {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name)) {
          cookieValue = decodeURIComponent(cookie.substring(name.length));
          break;
        }
      }
    }
    return cookieValue || '';
  }

  getCsrfToken(): string {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('csrftoken=')) {
          cookieValue = decodeURIComponent(cookie.substring('csrftoken='.length));
          break;
        }
      }
    }
    return cookieValue || '';
  }

  register(userData: any): Observable<any> {
    return this._HttpClient.post("/api/register/", userData);
  }

  login(userData: any): Observable<any> {
    return this._HttpClient.post("/api/login/", userData, { withCredentials: true });
  }

  user(): Observable<any> {
    const headers = new HttpHeaders({
      // 'X-CSRFToken': this.getCookie(`csrftoken=`),
      'X-CSRFToken': this.getCsrfToken(),
      'Content-Type': 'application/json'
    });
    return this._HttpClient.get("/api/user/", { headers, withCredentials: true });
  }

  logout(): Observable<any> {
    const headers = new HttpHeaders({
      // 'X-CSRFToken': this.getCookie(`csrftoken=`),
      'X-CSRFToken': this.getCsrfToken(),
      'Content-Type': 'application/json'
    });
    return this._HttpClient.post("/api/logout/", {}, {headers, withCredentials: true });
  }

  getTransactions(): Observable<any> {
    const headers = new HttpHeaders({
      // 'X-CSRFToken': this.getCookie(`csrftoken=`),

      'X-CSRFToken': this.getCsrfToken(),
      'Content-Type': 'application/json'
    });
    // console.log("CSRF Token:", this.getCsrfToken());
    return this._HttpClient.get("api/transactions/", { headers, withCredentials: true });
  }

  createTransaction(transactionData: any): Observable<any> {
    const headers = new HttpHeaders({
      // 'X-CSRFToken': this.getCookie(`csrftoken=`),
      'X-CSRFToken': this.getCsrfToken(),
      'Content-Type': 'application/json'
    });
    // console.log("CSRF Token:", this.getCsrfToken());
    return this._HttpClient.post("api/transactions/", transactionData, { headers, withCredentials: true });
  }

  isLogined = new BehaviorSubject(false);
  userData = new BehaviorSubject({});

}
