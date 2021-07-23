import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';
const url = require("url")

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.scss']
})
export class AnswerQuestionComponent implements OnInit {
  public qtnId
  public questions: any[] = []
  public question
  constructor(private backendService: InnerapplicationService,private spinner:NgxSpinnerService) { 
    this.qtnId = url.parse(location.href, true).query.qtnId
    this.spinner.show()
    this.backendService.getQuestions().subscribe(data => {
      this.questions = data;
      this.question = this.questions.filter(qtn => qtn.questionDetails._id == this.qtnId)[0]
      this.spinner.hide()
    })
  }
  ngOnInit(): void {
  }

}
