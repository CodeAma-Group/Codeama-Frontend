import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question
  constructor() { }

  ngOnInit(): void {
  }

  checkAnswered() {
    if(this.question.answered) {
      return 'Yes'
    }else {
      return 'No'
    }
  }

  

}
