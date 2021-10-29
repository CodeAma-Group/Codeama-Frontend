import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.css']
})
export class AdminGroupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  componentText = "Admin Group Works!";
  heading = "Codeama admin users"

}
