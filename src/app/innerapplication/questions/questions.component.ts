import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  public questions: any[] = [
    {
      devDetails: {
        pic: "assets/test_images/angular.png",
        username: 'abi_seth',
        names: "ABIJURU Seth",
        badge: "Pro"
      },
      questionDetails: {
        question: "How do I add routing in Laravel 8",
        desc: "Hi everybody, I'm Charlie, a french JS developer I just release a free abd open source project, tail-kit. It's a kit of components and template...",
        likes: 120,
        date_updated: "Jan 22, 2022",
        tagged_tech: [
          {
            tech: "Angular",
            img: "assets/test_images/angular.png"
          },
          {
            tech: "Angular",
            img: "assets/test_images/js.png"
          },
          {
            tech: "Angular",
            img: "assets/test_images/js.png"
          },
          {
            tech: "Angular",
            img: "assets/test_images/vue.png"
          },
          {
            tech: "Angular",
            img: "assets/test_images/js.png"
          }
        ],
        comments: [
          { 
            commentor_name: "",
            commentor_pic: "assets/test_images/angular.png",
            comment: '',
          },
          { 
            commentor_name: "",
            commentor_pic: "assets/test_images/js.png",
            comment: '',
          },
          { 
            commentor_name: "",
            commentor_pic: "assets/test_images/java.png",
            comment: '',
          }
        ]
      }
    },
    {
      devDetails: {
        pic: "assets/test_images/angular.png",
        username: 'abi_seth',
        names: "ABIJURU Seth",
        badge: "Pro"
      },
      questionDetails: {
        question: "How do I add routing in Laravel 8",
        desc: "Hi everybody, I'm Charlie, a french JS developer I just release a free abd open source project, tail-kit. It's a kit of components and template...",
        likes: 120,
        date_updated: "Jan 22, 2022",
        tagged_tech: [
          {
            tech: "Angular",
            img: "assets/test_images/angular.png"
          },
          {
            tech: "Angular",
            img: "assets/test_images/angular.png"
          }
        ],
        comments: [
          { 
            commentor_name: "",
            commentor_pic: "assets/test_images/angular.png",
            comment: '',
          },
          { 
            commentor_name: "",
            commentor_pic: "assets/test_images/angular.png",
            comment: '',
          },
          { 
            commentor_name: "",
            commentor_pic: "assets/test_images/angular.png",
            comment: '',
          }
        ]
      }
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
