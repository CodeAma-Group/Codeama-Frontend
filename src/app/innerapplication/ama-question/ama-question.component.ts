import { Component, OnInit } from '@angular/core';
import {AmaQuestionService} from '../services/ama-question.service'
import { QuestionData } from './question';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-ama-question',
  templateUrl: './ama-question.component.html',
  styleUrls: ['./ama-question.component.css']
})
export class AmaQuestionComponent implements OnInit {

  questions:any = []
  constructor(private amaQuestionService: AmaQuestionService,private router: ActivatedRoute, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.spinner.show()
    this.amaQuestionService.getAmaQuestions(this.router.snapshot.params.id)
        .subscribe((res:QuestionData)=> {
           this.questions = res.data
           this.spinner.hide()
        })
  }

  

}
