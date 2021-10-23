import { Component, OnInit, Input } from '@angular/core';
import {AmaQuestionService} from '../services/ama-question.service'
import { QuestionData } from './question';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-ama-question',
  templateUrl: './ama-question.component.html',
  styleUrls: ['./ama-question.component.css']
})
export class AmaQuestionComponent implements OnInit {
  
  auth_token = localStorage.getItem('codeama_auth_token');
  userData: any = jwt_decode(this.auth_token)
  userId: string = this.userData._id
  user_detail_class = 'beginner_details'
  questions:any = []
  constructor(private amaQuestion: AmaQuestionService,private router: ActivatedRoute, private spinner: NgxSpinnerService) { }
  @Input() question;


  ngOnInit(): void {
    this.spinner.show()
    console.log(this.userId);
    
    this.amaQuestion.questionsForAma(this.userId).subscribe((res)=> {
        this.questions = res
        this.questions = this.questions.data
        console.log(this.questions); 
        this.spinner.hide()

        
    })
  }



}
