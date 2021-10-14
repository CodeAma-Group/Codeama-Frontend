import { Component, OnInit } from '@angular/core';
import {AmaQuestionService} from '../services/ama-question.service'
import { QuestionData } from './question';

@Component({
  selector: 'app-ama-question',
  templateUrl: './ama-question.component.html',
  styleUrls: ['./ama-question.component.css']
})
export class AmaQuestionComponent implements OnInit {

  questions:any = []
  constructor(private amaQuestionService: AmaQuestionService) { }
  ngOnInit(): void {
    this.amaQuestionService.getAmaQuestions("60fd1b3cfc5f8200221cdd0c")
        .subscribe((res:QuestionData)=> {
           this.questions = res.data
        })
  }

  

}
