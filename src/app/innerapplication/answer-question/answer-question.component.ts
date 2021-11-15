import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';
import jwt_decode from 'jwt-decode';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../services/user.service';
import { decode } from 'querystring';
const url = require("url")

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AnswerQuestionComponent implements OnInit {
  htmlContent = '';
  userData: any = {};
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Poppins',
    defaultFontSize: '3',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'Roboto', name: 'Roboto' },
      { class: 'Poppins', name: 'Poppins' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
    toolbarHiddenButtons: [
      [
        'italic',
        'strikeThrough',
        'justifyFull',
        'indent',
        'outdent',
        'heading',
      ],
      [
        "fontName",
        "fontSize",
        'textColor',
        'backgroundColor',
        'customClasses',
        'insertHorizontalRule',
        'removecommentContentat',
        'toggleEditorMode',
      ],
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  public qtnId
  public questions: any[] = []
  public question
  answer
  isSubmitting: boolean = false
  public newAnsArray: any[] = []
  constructor(private backendService: InnerapplicationService,private spinner:NgxSpinnerService, private formBuilder: FormBuilder, private notifier: NotifierService, private _userService: UserService) { 
    this.spinner.show()
    this.answer = this.formBuilder.group({
      answer: ["",[Validators.required]]
    })
    this.qtnId = url.parse(location.href, true).query.qtnId
    let decoded: any = jwt_decode(localStorage.codeama_auth_token)
    this._userService.getUserEntireProfileData(decoded._id).subscribe((res: any) => {
      this.userData = res.data
    })
    this.backendService.getQuestions().subscribe(data => {
      this.questions = data;
      this.question = this.questions.filter(qtn => qtn.questionDetails._id == this.qtnId)[0]
      this.spinner.hide()
    })
  }
  ngOnInit(): void {
    this.spinner.show()
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
    this.isSubmitting = true;
    var decoded: any = jwt_decode(localStorage.codeama_auth_token);
    decoded.profilePicture = this.userData.profilePicture
    let newComment = {
      comments: {
        questionId: this.question.questionDetails._id,
        userId: this.question.devDetails._id,
        solver: decoded._id,
        comment: [{
          text_comment: this.htmlContent
        }]
      }
    }
    this.spinner.show()
    this.backendService.answerQuestion(newComment).subscribe(
      data => {
        this.spinner.hide()
        this.notifier.notify("success","Thanks for your answer!")
        this.newAnsArray.push({
          profilePicture:decoded.profilePicture,
          Username: decoded.username,
          text_comment: this.answer.value.answer,
          Badge: decoded.Badge
        })
        this.isSubmitting = false
      },
      error => {
        this.spinner.hide()
        console.log(error)
        this.notifier.notify("error","An unkown error occured!")
        this.isSubmitting = false
      }
    )
  }

}
