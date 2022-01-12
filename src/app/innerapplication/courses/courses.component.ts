import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoursesComponent implements OnInit {
  public articles: any[] = []
  public userData: any;
  public userId: any;
  public CommentBox: any = false;
  constructor(private backendService: InnerapplicationService, private spinner: NgxSpinnerService, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.spinner.show()
    this.backendService.getArticles().subscribe((data: any[]) => {
      this.articles = data
      this.spinner.hide()
    })
    
    this.userData = jwtDecode(localStorage.getItem('codeama_auth_token'))
    this.userId = this.userData._id
  }

  
  checkBadge(badge: string){
    let className:string = ""
    switch(badge.toLowerCase()){
      case "absolute beginner": className = "absBeg";
        break;
      case "intermediate": className = "interm";
        break;
      case "pro": className = "pro";
       break;
      default: className="beginner"
    }
    return className
  }

  checkLike(articleLikeArray:Array<String>){
    if (articleLikeArray.includes(this.userId)) {
       return '#4290ed'
    }
    else{
      return '#ffffff'
    }
  }

  toogleCommentBox(){
    if (this.CommentBox == false) {
      this.CommentBox = true 
    }
    else{
      this.CommentBox = false
    }
  }

  likingInProgress: boolean = false;
  currentLikeId: string = "";

  addLike(id){
    this.currentLikeId = id;
    this.articles.forEach(article => {
      if(article.articleDetails._id == id){
        if(article.articleDetails.Likes.indexOf(id) == -1){
          article.articleDetails.Likes.push(id)
          article.likeOfUserIncluded = true
          

          if (!this.likingInProgress) {
            this.likingInProgress = true;

            this.backendService.addLikeToArticle(id).subscribe(
              res => {
                this.likingInProgress = false;
              },
              err => {
                this.notifier.notify("error", "Something went wrong! Try again");
                this.likingInProgress = false;

                let idIndex = article.articleDetails.Likes.indexOf(id)
                article.articleDetails.Likes.splice(idIndex, 1)
                article.likeOfUserIncluded = false 
              }
            )
          }

        }
        else{
          let idIndex = article.articleDetails.Likes.indexOf(id)
          article.articleDetails.Likes.splice(idIndex, 1)
          article.likeOfUserIncluded = false 

          if (!this.likingInProgress) {
            this.likingInProgress = true;

            this.backendService.addLikeToArticle(id).subscribe(
              res => {
                console.log(res)
                this.likingInProgress = false;
              },
              err => {
                this.notifier.notify("error", "Something went wrong! Try again");
                this.likingInProgress = false;
                
                article.articleDetails.Likes.push(id)
                article.likeOfUserIncluded = true
              }
            )
          }
          
        }
      }
    })
  }
}
