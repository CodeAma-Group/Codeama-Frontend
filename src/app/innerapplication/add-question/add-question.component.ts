import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import jwt_decode from 'jwt-decode'
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  question
  constructor(private formBuilder: FormBuilder, private backendService: InnerapplicationService, private spinner: NgxSpinnerService, private notifier: NotifierService) {
    this.question = this.formBuilder.group({
      title: ["",[Validators.required]],
      desc: ["",[Validators.required]],
      qtn: ["",[Validators.required]],
      tagged_tech: ["",[Validators.required]]
    })
   }
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
        text_question: this.question.value.qtn,
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
    },
    (error) => {
      this.spinner.hide()
      console.log(error)
      this.notifier.notify("error","An error occured, try again!")
    }
    )
  }
}
