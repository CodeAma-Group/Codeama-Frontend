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
      title: [""],
      desc: [""],
      qtn: ["..."]
    })
   }

  ngOnInit(): void {
  }
  submitQtn(e: Event){
    e.preventDefault();
    console.log(this.question.value)
  }
}
