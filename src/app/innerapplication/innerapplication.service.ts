import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class InnerapplicationService {
  private base: string = "http://codeama-backend.herokuapp.com/"
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
              pic: data[i].ownerId.profilePicture,
              username: data[i].ownerId.Username,
              names: data[i].ownerId.Username,
              badge: data[i].ownerId.Badge,
              _id: data[i].ownerId._id
            },
            articleDetails: {
              article: data[i].title,
              desc: data[i].description,
              likes: data[i].likes,
              date_updated: data[i].updatedAt,
              article_img: data[i].thumbnailUrl,
              comments: data[i].comments,
              _id: data[i]._id
            }
          }
          articlesArray.push(singleArt)
        }
        return articlesArray
      })
    )
    return articles
  }

  public getResources(){
    let resources = <Observable<any[]>>this.http.get(this.base+"resources", {
      params: {
        limit: "100000"
      }
    })
    .pipe(
      pluck("data", "docs"),
      map((data: any[]) => {
        var resourcesArray: any[] = [];
        for(let i=0; i<data.length; i++){
          var singleArt: any = {
            devDetails: {
              pic: data[i].ownerId.profilePicture,
              username: data[i].ownerId.Username,
              names: data[i].ownerId.Username,
              badge: data[i].ownerId.Badge,
              _id: data[i].ownerId._id
            },
            resourceDetails: {
              resource: data[i].title,
              resourceKind: data[i].resourceType,
              resourceLink: data[i].resourceLink || location.href,
              desc: data[i].description,
              likes: data[i].likes,
              date_updated: data[i].updatedAt,
              resource_img: data[i].thumbnailUrl,
              comments: data[i].comments,
              _id: data[i]._id
            }
          }
          resourcesArray.push(singleArt)
        }
        return resourcesArray
      })
    )
    return resources
  }

  public getUser(userId: string){
    return <Observable<any>>this.http.get(this.base+"users/"+userId)
  }
}
