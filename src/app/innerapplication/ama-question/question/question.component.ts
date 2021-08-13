import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  user_detail_class = 'beginner_details'
  @Input() question
  constructor() { }

  ngOnInit(): void {
  }

  userDetailClass() {
    switch(this.question.badge) {
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

  checkAnswered() {
    if(this.question.answered) {
      return 'Yes'
    }else {
      return 'No'
    }
  }

  

}
