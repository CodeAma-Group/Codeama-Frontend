import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  public resources: any[] = [
    {
      devDetails: {
        pic: "assets/test_images/angular.png",
        username: 'abi_seth',
        names: "ABIJURU Seth",
        badge: "Pro"
      },
      resourceDetails: {
        resource: "Java crash course",
        desc: "Hi everybody, I'm Charlie, a french JS developer I just release a free abd open source project, tail-kit. It's a kit of components and template...",
        likes: 120,
        resourceLink: "angeBelard.com",
        resourceKind: "Youtube video",
        date_updated: "Jan 22, 2022",
        resource_img: "assets/images/logo.png",
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
      resourceDetails: {
        resource: "Responsive tips",
        desc: "Hi everybody, I'm Charlie, a french JS developer I just release a free abd open source project, tail-kit. It's a kit of components and template...",
        likes: 120,
        date_updated: "Jan 22, 2022",
        resourceLink: "angeBelard.com",
        resourceKind: "CodeAma article",
        resource_img: "assets/images/logo.png",
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
