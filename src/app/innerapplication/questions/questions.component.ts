import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  public questions;
  constructor(private backendService: InnerapplicationService, private spinner: NgxSpinnerService) { }

  ngOnInit(){
    this.spinner.show()
    this.backendService.getQuestions().subscribe(data => {
      this.questions = data;
      this.spinner.hide()
      
    })
  }
  public answerQuestionLink:string = "app/answer-question?qtnId="

}
