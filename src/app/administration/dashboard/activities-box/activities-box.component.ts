import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activities-box',
  templateUrl: './activities-box.component.html',
  styleUrls: ['./activities-box.component.css']
})
export class ActivitiesBoxComponent implements OnInit {
  @Input() activity
  @Input() index
  constructor() { }
  
  ngOnInit(): void {
  }
  
  getActivityTitle() {
    if(this.activity.activity === "Challenges") {
      return "Challenges Taken"
    }else {
      return "Projects Posted"
    }
  }

  getActivityWidth() {
    if(this.activity.activity === "Projects") {
      return "project"
    }
  }



}
