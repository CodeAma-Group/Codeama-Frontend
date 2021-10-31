import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-our-users',
  templateUrl: './our-users.component.html',
  styleUrls: ['./our-users.component.css']
})
export class OurUsersComponent implements OnInit {

  constructor() { }
  
  ngOnInit(): void {
  }
  componentText="our users works!"
  heading = "Codeama users"
}
