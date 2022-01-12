import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { InnerapplicationService } from '../innerapplication.service';

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
  constructor(private backendService: InnerapplicationService, private spinner: NgxSpinnerService) { }

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
  addLike(id){
    this.articles.forEach(article => {
      if(article.articleDetails._id == id){
        if(!article.articleDetails.Likes.includes(id)){
          article.articleDetails.Likes.push(id)
          article.likeOfUserIncluded = true
          this.articles = this.articles 

          this.backendService.addLikeToArticle(id).subscribe()
        }
        else{
          let idIndex = article.articleDetails.Likes.indexOf(id)
          article.articleDetails.Likes.splice(idIndex, 1)
          article.likeOfUserIncluded = false 
          this.articles = this.articles

          this.backendService.addLikeToArticle(id).subscribe()
        }
      }
    })
  }
}
