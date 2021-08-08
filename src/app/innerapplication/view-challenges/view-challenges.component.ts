import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-challenges',
  templateUrl: './view-challenges.component.html',
  styleUrls: ['./view-challenges.component.css']
})
export class ViewChallengesComponent implements OnInit {
  user_detail_class = 'beginner_details'
  challenge_takers = []
  constructor() { }

  ngOnInit(): void {
     this.challenge_takers = [
       {
         profile: "../../.././../assets/images/profile.jpg",
         badge: "pro",
         username : "Gasaro Leila",
         userEmail : "abiseth.codeama.net",
         join_date: "12th,January,2021",
         challenges_taken_count: 2,
         submitted:true
       },

       {
        profile: "../../.././../assets/images/profile.jpg",
        badge: "intermediate",
        username : "Gasaro Leila",
        userEmail : "abiseth.codeama.net",
        join_date: "12th,January,2021",
        challenges_taken_count: 2,
        submitted:false
      },

      {
        profile: "../../.././../assets/images/profile.jpg",
        badge: "beginner",
        username : "Gasaro Leila",
        userEmail : "abiseth.codeama.net",
        join_date: "12th,January,2021",
        challenges_taken_count: 2,
        submitted:false
      },

      {
        profile: "../../.././../assets/images/profile.jpg",
        badge: "absbeginner",
        username : "Gasaro Leila",
        userEmail : "abiseth.codeama.net",
        join_date: "12th,January,2021",
        challenges_taken_count: 2,
        submitted:false
      }
     ]
  }


  

}
