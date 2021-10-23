import { Component, OnInit } from '@angular/core';
import {AmaQuestionService} from '../services/ama-question.service'
import { QuestionData } from './question';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-ama-question',
  templateUrl: './ama-question.component.html',
  styleUrls: ['./ama-question.component.css']
})
export class AmaQuestionComponent implements OnInit {

  questions:any = []
  showEmpty: Boolean = false
  constructor(private amaQuestionService: AmaQuestionService,private router: ActivatedRoute, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.spinner.show()
    let loggedInUser:any = jwtDecode(localStorage.codeama_auth_token)
    this.amaQuestionService.getAmaQuestions(loggedInUser._id)
        .subscribe((res:QuestionData)=> {
           this.questions = res.data
          if(this.questions.length === 0) {
            this.showEmpty = true
          }
           this.spinner.hide()
        })
  }

  

}
