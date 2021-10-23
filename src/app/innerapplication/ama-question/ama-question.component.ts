import { Component, OnInit, Input } from '@angular/core';
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
  
  auth_token = localStorage.getItem('codeama_auth_token');
  userData: any = jwtDecode(this.auth_token)
  userId: string = this.userData._id
  user_detail_class = 'beginner_details'
  questions:any = []
  showEmpty: Boolean = false
  constructor(private amaQuestionService: AmaQuestionService,private router: ActivatedRoute, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.spinner.show()
    let loggedInUser:any = jwtDecode(localStorage.codeama_auth_token)
    console.log(loggedInUser)
    this.amaQuestionService.getAmaQuestions(loggedInUser._id)
        .subscribe((res:QuestionData)=> {
           this.questions = res.data
           console.log(this.questions)
          if(this.questions.length === 0) {
            this.showEmpty = true
          }
           this.spinner.hide()
        })
  }



}
