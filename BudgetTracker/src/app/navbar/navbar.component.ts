import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DataService } from '../data.service';
import { error } from 'console';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements OnInit {
  auth:boolean= false;

  constructor(private _DataService: DataService, private _Router: Router) {}

  ngOnInit(): void {
    // this.checkUser();
    this._DataService.isLogined.subscribe(
      v => {this.auth = v;}
        );
  }

  checkUser(): void {
    this._DataService.user().subscribe(
      response => {
        console.log("User data:", response);
        this.auth = true;
      },
      error => {
        console.error("Error fetching user data:", error);
        this.auth = false;
      }
    );
  }

  logoutevent(): void {
    this._DataService.logout().subscribe(
      response => {
        console.log("User has logged out", response);
        this.auth = false; // Update auth status on logout
        this._Router.navigate(['/login']); // Redirect to login page if needed
      },
      error => {
        console.error("Logout error:", error);
      }
    );
  }
  isCurrentRoute(route: string): boolean {
    return this._Router.url === route && this._Router.url != "/home"; // Check if current route matches
  }
  isPage(route:string):boolean{
    return this._Router.url === route;
  }

}
