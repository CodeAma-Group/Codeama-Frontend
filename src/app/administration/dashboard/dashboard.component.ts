import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  componentText = "Dashboard works!";
  heading = "Administration dashboard";

  cards = [
    {
      title: "CodeAmas",
      totalCount: "7,345",
      icon: "../../assets/icons/Group 67.png"
    },

    {
      title: "Bugs Published",
      totalCount: "7,345",
      icon: "../../assets/icons/Group 68.png"
    },

    {
      title: "Resources",
      totalCount: "7,345",
      icon: "../../assets/icons/Group 69.png"
    },

    {
      title: "Articles",
      totalCount: "7,345",
      icon: "../../assets/icons/Group 70.png"
    },

    {
      title: "Other questions",
      totalCount: "7,345",
      icon: "../../assets/icons/Group 71.png"
    }
  ]

  
  activities = [
    {
      icon: "../../assets/icons/Group 72.png",
      activity: "Challenges",
      startDate: "12th January 2021",
      stats: ["12,345","1000","345"]
    },

    {
      icon: "../../assets/icons/Group 73.png",
      activity: "Projects",
      startDate: "14th January 2021",
      stats: ["12,345","100"]
    }
  ]

  

}
