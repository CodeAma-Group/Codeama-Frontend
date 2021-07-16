import { Component, OnInit } from '@angular/core';
import { InnerapplicationService } from '../innerapplication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public article: string = ""
  public location: Location = window.location
  cookieVal:string = "";
  constructor(private backendService: InnerapplicationService) { }
  ngOnInit(){
    
  }
}
