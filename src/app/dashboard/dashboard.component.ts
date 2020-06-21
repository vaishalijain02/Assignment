import { User } from './../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: User;
  constructor() {}
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  back() {
    localStorage.removeItem('user');
  }
}
