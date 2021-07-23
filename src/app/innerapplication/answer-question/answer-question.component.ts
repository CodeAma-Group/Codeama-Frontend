import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';
import jwt_decode from 'jwt-decode'
import { decode } from 'punycode';
import { error } from 'protractor';
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
  answer
  constructor(private backendService: InnerapplicationService,private spinner:NgxSpinnerService, private formBuilder: FormBuilder) { 
    this.answer = this.formBuilder.group({
      answer: ["",[Validators.required]]
    })
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

  public getSolver(solver: string){
    let solverObj: any = {}
    let myString = solver.replace("\n ","")
    myString = myString.replace(/([0-9-]+T\d{2}:\d{2}:\d{2}?\.?\d+Z)/g,'"$1"').replace(/([0-9a-z]{24})/g,'"$1"')
    eval("solverObj="+myString)
    return solverObj
  }

  answerQue(e: Event){
    e.preventDefault();
    var decoded: any = jwt_decode(localStorage.codeama_auth_token)
    let newComment = {
      comments: JSON.stringify({
        questionId: this.question.questionDetails._id,
        userId: this.question.devDetails._id,
        solver: decoded._id,
        comment: [{
          text_comment: this.answer.value.answer
        }]
      })
    }
    console.log(newComment)
    this.backendService.answerQuestion(newComment).subscribe(
      data => console.log(data),
      error => console.log(error)
    )
  }

}
