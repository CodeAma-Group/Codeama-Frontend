import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';
import jwt_decode from 'jwt-decode'
import { NotifierService } from 'angular-notifier';
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
  isSubmitting: boolean = true
  public newAnsArray: any[] = []
  constructor(private backendService: InnerapplicationService,private spinner:NgxSpinnerService, private formBuilder: FormBuilder, private notifier: NotifierService) { 
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
  checkBadge(badge: string){
    let className:string = ""
    switch(badge.toLowerCase()){
      case "absolute beginner": className = "absBeg";
        break;
      case "intermediate": className = "interm";
        break;
      case "pro": className = "pro";
       break;
      default: className="beginner"
    }
    return className
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
    this.backendService.answerQuestion(newComment).subscribe(
      data => {
        this.newAnsArray.push({
          Username: decoded.Username,
          text_comment: this.answer.value.answer
        })
        this.notifier.notify("success","Thanks for your answer!")
      },
      error => {
        console.log(error)
        this.notifier.notify("error","An unkown error occured!")
      }
    )
  }

}
