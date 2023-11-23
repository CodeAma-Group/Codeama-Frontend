import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ItemCountsService {
  articleCount: any = 0
  constructor(private http: HttpClient) { }

  public getArticlesCount() {
    return this.http.get("https://codeama-backend.onrender.com/articles?limit=5&page=1")
  }

  public getAmas() {
    return this.http.get("https://codeama-backend.onrender.com/codeama")
  }

  public getBugs() {
    return this.http.get("https://codeama-backend.onrender.com/all_bugs")
  }

  public getResources() {
    return this.http.get("https://codeama-backend.onrender.com/resources?limit=5&page=1")
  }

  public getQuestions() {
    return this.http.get("https://codeama-backend.onrender.com/view_questions/all")
  }
}
