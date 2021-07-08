import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public article: string = ""
  public location: Location = window.location
  constructor() { }

  ngOnInit(): void {
  }

}
