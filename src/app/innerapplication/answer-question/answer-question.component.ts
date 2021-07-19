import { Component, OnInit } from '@angular/core';
const url = require("url")

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.scss']
})
export class AnswerQuestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(url)
  }

}
