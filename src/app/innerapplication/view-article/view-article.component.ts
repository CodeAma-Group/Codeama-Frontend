import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { InnerapplicationService } from '../innerapplication.service';
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit {

  articleId:any;
  articleInfo:any;
  comment:any;
  articleComments:any;
  hasSubmitted:boolean = false;

  addComment(comment:any){
 
    if(comment.comment.trim().length > 0){
      
      this.hasSubmitted = true;

        let decoded: any = jwt_decode(localStorage.codeama_auth_token)
     
        let data = {
          content: comment.comment,
          postId: this.articleId,
          commentType: "Article",
          createdBy: decoded._id
        }
       
        this.backendService.commentArticle(data).subscribe((res) => {
         this.hasSubmitted = false;
          console.log(res);
        })

        this.comment = "";
        this.viewArticle(this.articleId);
        this.viewArticleComments(this.articleId);
     }


  }

  viewArticle(id:any){
    this.backendService.viewArticle(id).subscribe((res:any)=>{
      this.articleInfo = res.data;
      
      console.log(res.data)
    })
  }

  viewArticleComments(id){
    this.backendService.viewArticleComments(id).subscribe((res:any)=>{
      this.articleComments = res.data;
    })
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

  constructor(private actRoute: ActivatedRoute,private backendService: InnerapplicationService,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {

    this.actRoute.paramMap.subscribe(params => {
      this.articleId = params.get('articleId');
      this.viewArticle(params.get('articleId'));
      this.viewArticleComments(params.get('articleId'));
    });

  }

}
