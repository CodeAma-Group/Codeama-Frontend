import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  public articles: any[] = [
    {
      devDetails: {
        pic: "assets/test_images/angular.png",
        username: 'abi_seth',
        names: "ABIJURU Seth",
        badge: "Pro"
      },
      articleDetails: {
        article: "Tail-kit: 200+ free Tailwind components / templates",
        desc: "Hi everybody, I'm Charlie, a french JS developer I just release a free abd open source project, tail-kit. It's a kit of components and template...",
        likes: 120,
        date_updated: "Jan 22, 2022",
        article_img: "assets/images/logo.png",
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
      articleDetails: {
        article: "How do I add routing in Laravel 8",
        desc: "Hi everybody, I'm Charlie, a french JS developer I just release a free abd open source project, tail-kit. It's a kit of components and template...",
        likes: 120,
        date_updated: "Jan 22, 2022",
        article_img: "assets/images/logo.png",
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
