import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ama-question',
  templateUrl: './ama-question.component.html',
  styleUrls: ['./ama-question.component.css']
})
export class AmaQuestionComponent implements OnInit {

  questions  = []
  constructor() { }

  ngOnInit(): void {
    this.questions = [
      {
    profile: "../../.././../assets/images/profile.jpg",
    badge: "pro",
    username : "Gasaro Leila",
    userEmail : "abiseth.codeama.net",
    asked_date :"12th,January,2021",
    question_title : "React app what is the best way to add large text blocks",
    question_description :"This is all the question details that will just reflect a title here before seeing the entire body...",
    question_viewers :5,
    question_comment_count : 5,
    answered : true
      },
  
      {
        profile: "../../.././../assets/images/profile.jpg",
        badge: "intermediate",
        username : "Gasaro Leila",
        userEmail : "abiseth.codeama.net",
        asked_date :"12th,January,2021",
        question_title : "React app what is the best way to add large text blocks",
        question_description :"This is all the question details that will just reflect a title here before seeing the entire body...",
        question_viewers :5,
        question_comment_count : 5,
        answered : false
          },
 
          {
            profile: "../../.././../assets/images/profile.jpg",
            badge: "intermediate",
            username : "Gasaro Leila",
            userEmail : "abiseth.codeama.net",
            asked_date :"12th,January,2021",
            question_title : "React app what is the best way to add large text blocks",
            question_description :"This is all the question details that will just reflect a title here before seeing the entire body...",
            question_viewers :5,
            question_comment_count : 5,
            answered : false
              },

              {
                profile: "../../.././../assets/images/profile.jpg",
                badge: "intermediate",
                username : "Gasaro Leila",
                userEmail : "abiseth.codeama.net",
                asked_date :"12th,January,2021",
                question_title : "React app what is the best way to add large text blocks",
                question_description :"This is all the question details that will just reflect a title here before seeing the entire body...",
                question_viewers :5,
                question_comment_count : 5,
                answered : false
                  }

    ]
  }

  

}
