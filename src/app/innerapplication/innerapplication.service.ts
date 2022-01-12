import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators'
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class InnerapplicationService {
  private base: string = "https://codeama-backend.herokuapp.com/"
  public userData: any = jwtDecode(localStorage.getItem('codeama_auth_token'));
  public userId: any = this.userData._id;
  constructor(private http: HttpClient) {}
  

  public getArticles(){
    let articles = <Observable<any[]>>this.http.get(this.base+"articles", {
      params: {
        limit: "100000"
      }
    })
    .pipe(
      pluck("data", "docs"),
      map((data: any[]) => {
        var articlesArray: any[] = [];
        for(let i=0; i<data.length; i++){
          var singleArt: any = {
            devDetails: {
              pic: data[i].ownerId?.profilePicture,
              username: data[i].ownerId?.Username,
              names: data[i].ownerId?.Username,
              badge: data[i].ownerId?.Badge,
              _id: data[i].ownerId?._id
            },
            articleDetails: {
              article: data[i].title,
              desc: data[i].description,
              Likes: data[i].Likes,
              date_updated: data[i].updatedAt,
              article_img: data[i].thumbnailUrl,
              comments: data[i].comments,
              _id: data[i]._id
            },
            likeOfUserIncluded: data[i].Likes.includes(this.userId)
          }
          articlesArray.push(singleArt)
        }
        articlesArray = articlesArray.reverse()
        return articlesArray
      })
    )
    return articles
  }

  public getResources(){
    let resources = <Observable<any[]>>this.http.get(this.base+"resources", {
      params: {
        limit: "100000"
      },
    })
    .pipe(
      pluck("data", "docs"),
      map((data: any[]) => {
        var resourcesArray: any[] = [];
        for(let i=0; i<data.length; i++){
          var singleArt: any = {
            devDetails: {
              pic: data[i].ownerId?.profilePicture,
              username: data[i].ownerId?.Username,
              names: data[i].ownerId?.Username,
              badge: data[i].ownerId?.Badge,
              _id: data[i].ownerId?._id
            },
            resourceDetails: {
              resource: data[i].title,
              resourceKind: data[i].resourceType,
              resourceLink: "https://" + data[i].link || location.href,
              desc: data[i].description,
              Likes: data[i].Likes,
              date_updated: data[i].updatedAt,
              resource_img: data[i].thumbnailUrl,
              comments: data[i].comments,
              _id: data[i]._id
            }
          }
          resourcesArray.push(singleArt)
        }
        resourcesArray = resourcesArray.reverse()
        return resourcesArray
      })
    )
    return resources
  }

  public getQuestions(){
    let questions = <Observable<any[]>>this.http.get(this.base+"view_questions/all")
    .pipe(
      pluck("data"),
      map((data: any[]) => {
        var questionsArray: any[] = [];
        for(let i=0; i<data.length; i++){
          var tagged_tech: any[] = []
          var tech: string
          for(tech of data[i].question.tagged_technologies.split(",")){
            tagged_tech.push({
              tech,
              img: "assets/test_images/" + tech.toLowerCase() + ".png"
            })
          }
          var singleQue: any = {
            devDetails: {
              pic: data[i].userInfo.profilePicture,
              username: data[i].userInfo.Username || "Code AMA",
              names: data[i].userInfo.Username || "Codeama",
              badge: data[i].userInfo.Badge  || "codeama",
              _id: data[i].userInfo._id
            },
            questionDetails: {
              question: data[i].question.question_title,              
              desc: data[i].question.question_description,
              text_qtn: data[i].question.text_question,
              likes: data[i].Likes,
              date_updated: data[i].date,
              question_img: data[i].question.image_question,
              tagged_tech,
              main_question: data[i].question.text_question,
              code_snippet: data[i].question.code_snippet,
              comments: data[i].comment,
              _id: data[i].question._id
            }
          }
          questionsArray.push(singleQue)
        }
    
        return questionsArray
      })
    )
    return questions
  }

  public addResource(body: FormData){
    return <Observable<any>>this.http.post(this.base + "resources", body)
  }

  public addQuestion(body){
    return <Observable<string>>this.http.post(this.base + "post_question", body);
  }  

  public addArticle(body){
    return this.http.post<Observable<any>>(this.base + "articles", body)
  }

public answerQuestion(body){
    return this.http.post<Observable<any>>(this.base + "answerPostedQuestion", body)
  }

  public viewArticle(article){
    return this.http.get<Observable<any>>(this.base + "articles/"+article)
  }

  public commentArticle(body){
    return this.http.post<Observable<any>>(this.base + "comment", body)
  }

  public viewArticleComments(id){
    return this.http.get<Observable<any>>(this.base + "comment/"+id)
  }

  public addLikeToArticle(id){
    return this.http.patch<Observable<any>>(this.base + "articles/like/" + id, {})
  }
  public likeUnlikeResource(id){
    return this.http.patch(this.base+"resources/like/"+id, {}, {
      headers: {
        "Authorization": localStorage.codeama_auth_token
      }
    })
  }

  public getResourcesOfLoggedInUser(){
    let resources = <Observable<any[]>>this.http.get(this.base+"user/resources", {
      headers: {
        "Authorization": localStorage.codeama_auth_token
      },
    })
    .pipe(
      pluck("data", "docs"),
      map((data: any[]) => {
        var resourcesArray: any[] = [];
        for(let i=0; i<data.length; i++){
          var singleArt: any = {
            devDetails: {
              pic: data[i].ownerId?.profilePicture,
              username: data[i].ownerId?.Username,
              names: data[i].ownerId?.Username,
              badge: data[i].ownerId?.Badge,
              _id: data[i].ownerId?._id
            },
            resourceDetails: {
              resource: data[i].title,
              resourceKind: data[i].resourceType,
              resourceLink: "https://" + data[i].link || location.href,
              desc: data[i].description,
              Likes: data[i].Likes,
              date_updated: data[i].updatedAt,
              resource_img: data[i].thumbnailUrl,
              comments: data[i].comments,
              _id: data[i]._id
            }
          }
          resourcesArray.push(singleArt)
        }
        resourcesArray = resourcesArray.reverse()
        return resourcesArray
      })
    )
    return resources
  }

}
