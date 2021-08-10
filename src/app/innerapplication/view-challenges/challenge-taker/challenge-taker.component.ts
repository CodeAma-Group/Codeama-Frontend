import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-challenge-taker',
  templateUrl: './challenge-taker.component.html',
  styleUrls: ['./challenge-taker.component.css']
})
export class ChallengeTakerComponent implements OnInit {
  user_detail_class = 'beginner_details'
  @Input() challenge_taker
  constructor() { }

  ngOnInit(): void {
  }

  userDetailClass() {
       switch(this.challenge_taker.badge) {
          case 'pro':
            this.user_detail_class = 'pro_details'
            break

           case 'absbeginner':
             this.user_detail_class = 'absbeginner_details'
             break

           case 'beginner':
             this.user_detail_class = 'beginner_details'
            break


           default:
             this.user_detail_class = 'intermediate_details'
       }

    return this.user_detail_class
 }

 checkSubmitted() {
   if(this.challenge_taker.submitted) {
     return 'Yes'
   }else {
     return 'No'
   }
 }

}