import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent implements OnInit {
  auth = false;
  constructor(private _DataService: DataService) {}

  ngOnInit(): void {
    // this.checkUser();
    this._DataService.isLogined.subscribe(
      v => {this.auth = v;}
        );
  }
}
