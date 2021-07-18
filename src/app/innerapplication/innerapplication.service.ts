import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class InnerapplicationService {
  private base: string = "https://codeama-backend.herokuapp.com/"
  constructor(private http: HttpClient) {}

  public getArticles(){
    let articles = <Observable<any[]>>this.http.get(this.base+"articles", {
      params: {
        limit: "10000"
      }
    })
    .pipe(
      pluck("data", "docs"),
      map((data: any[]) => {
        for(let i=0; i<data.length; i++){
          this.getUser(data[i].ownerId).subscribe(user => {
            console.log(user)
          })
        }
        return data
      })
    )
    return articles
  }

  public getUser(userId: string){
    return <Observable<any>>this.http.get(this.base+"users/"+userId)
  }
}
