import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {
  question
  constructor(private formBuilder: FormBuilder) {
    this.question = this.formBuilder.group({
      title: ["",[]],
      desc: ["",[]],
      qtn: ["...",[]],
      tagged_tech: ["",[]]
    })
   }
   public options = [
     {label: "Java", value:"Java"},
     {label: "Javascript", value:"Javascript"},
     {label: "Vuex", value:"Vuex"},
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
    console.log(this.question.value)
  }
}
