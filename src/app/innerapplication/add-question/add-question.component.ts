import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import jwt_decode from 'jwt-decode'
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  question
  constructor(private formBuilder: FormBuilder, private backendService: InnerapplicationService, private spinner: NgxSpinnerService, private notifier: NotifierService, private router: Router) {
    this.question = this.formBuilder.group({
      title: ["",[Validators.required]],
      desc: ["",[Validators.required]],
      qtn: ["...",[Validators.required]],
      tagged_tech: ["",[Validators.required]]
    })
   }
   htmlContent;
   
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

   
   public options = [
     {label: "Java", value:"Java"},
     {label: "Javascript", value:"Javascript"},
     {label: "Vue", value:"Vue"},
     {label: "React", value:"React"},
     {label: "Rust", value:"Rust"},
     {label: "C", value:"C"},
     {label: "C++", value:"C++"},
     {label: "C#", value:"C#"},
     {label: "Go", value:"Go"},
     {label: "HTML", value:"HTML"},
     {label: "CSS", value:"CSS"},
     {label: "SCSS", value:"SCSS"},
     {label: "SASS", value:"SASS"},
     {label: "Angular", value:"Angular"},
     {label: "Python", value:"Python"},
     {label: "Svelte", value:"Svelte"},
     {label: "Typescript", value:"Typescript"},
     {label: "Ruby", value:"Ruby"},
     {label: "Haskell", value:"Haskell"},
     {label: "NextJs", value:"NextJs"},
     {label: "Php", value:"Php"},
   ]
   public fields = {text: 'label',value: 'value'}

  ngOnInit(): void {
  }
  submitQtn(e: Event){
    e.preventDefault();
    this.spinner.show()
    var decoded: any = jwt_decode(localStorage.codeama_auth_token)
    let newQue = {
      userId: decoded._id,
      questions: [{
        question_title: this.question.value.title,
        question_description: this.question.value.desc,
        text_question: this.htmlContent,
        tagged_technologies: this.question.value.tagged_tech.join(",")
      }]
    }
    let newQueForm = {
      question: JSON.stringify(newQue)
    }
    console.log(newQueForm)
    this.backendService.addQuestion(newQueForm).subscribe(
      (data) => {
        console.log(data)
        this.spinner.hide()
        this.notifier.notify("success","Question posted successfully!" )
        this.htmlContent = ""
        setTimeout(() => this.router.navigate(['app/hood/questions']), 1000)
    },
    (error) => {
      this.spinner.hide()
      console.log(error)
      this.notifier.notify("error","An error occured, try again!")
    }
    )
  }
}
