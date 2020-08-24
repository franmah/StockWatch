import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  companiesFollowed: string[]; // stock name of companies

  constructor() { }

  ngOnInit(): void {
    this.companiesFollowed = ["aapl", "fb", "amzn"];
  }
}
