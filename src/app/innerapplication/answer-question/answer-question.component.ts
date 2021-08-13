import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';
import jwt_decode from 'jwt-decode'
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { decode } from 'punycode';
import { error } from 'protractor';
import { NotifierService } from 'angular-notifier';
const url = require("url")

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.scss']
})
export class AnswerQuestionComponent implements OnInit {
  public qtnId:any;
  public questions: any[] = []
  public question:any;
  answer
  constructor(private backendService: InnerapplicationService,private spinner:NgxSpinnerService, private formBuilder: FormBuilder,private notifier: NotifierService) { 
    this.answer = this.formBuilder.group({
      htmlContent: [],
      codemirror: []
    })
    this.qtnId = url.parse(location.href, true).query.qtnId
    this.spinner.show()
  
    this.backendService.getOneQuestions(this.qtnId).subscribe(data => {
      this.question = data.data[0];
      this.spinner.hide()
    })
  }

  htmlContent:any = '';
  codemirror:any = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Poppins',
    defaultFontSize: '2',
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
        'fontName',
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'insertHorizontalRule',
        'removeFormat',
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

  codeMirrorOptions: any = {
    theme: 'cobalt',
    mode: 'application/ld+json',
    lineNumbers: true,
    // readOnly:true,
    autocorrect: true,
    smartIndent: true,
    lineWrapping: true,
    readonly: true,
    foldGutter: true,
    gutters: [
      'CodeMirror-linenumbers',
      'CodeMirror-foldgutter',
      'CodeMirror-lint-markers',
    ],
    autoCloseBrackets: true,
    automatically: true,
    matchBrackets: true,
    lint: true,
  };

  codeMirrorOptions2: any = {
    theme: 'default',
    mode: 'application/ld+json',
    lineNumbers: false,
    readOnly: true,
    autocorrect: true,
    smartIndent: true,
    lineWrapping: true,
    readonly: true,
    foldGutter: true,
    gutters: [
      'CodeMirror-linenumbers',
      'CodeMirror-foldgutter',
      'CodeMirror-lint-markers',
    ],
    autoCloseBrackets: true,
    automatically: true,
    matchBrackets: true,
    lint: true,
  };

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

  getSolver(solver: string){
    let solverObj: any = {}
    let myString = solver.replace("\n ","")
    myString = myString.replace(/([0-9-]+T\d{2}:\d{2}:\d{2}?\.?\d+Z)/g,'"$1"').replace(/([0-9a-z]{24})/g,'"$1"')
    eval("solverObj="+myString)
    return solverObj
  }

   answerQue(e: any) {
    if(e.htmlContent.trim().length >0){
    let decoded: any = jwt_decode(localStorage.codeama_auth_token);

      let newComment:any = {
        questionId: this.question.question._id,
        userId: this.question.userInfo._id,
        solver: decoded._id,
        comment: [
          {
            text_comment: e.htmlContent.trim(),
            code_snippet_comment: [
              {
                code_block: e.codemirror.trim(),
              },
            ],
          }
        ]
      }
      this.spinner.show()
      this.backendService.answerQuestion(newComment).subscribe(
      (datas:any) =>{
        this.backendService.getOneQuestions(this.qtnId).subscribe(data => {
          this.question = data.data[0];
          this.spinner.hide()
          this.htmlContent = "";
          e = "";
          this.notifier.notify("success",datas.message)
        })
      },
      (error) => console.log(error)
    );
    }
  }

}
