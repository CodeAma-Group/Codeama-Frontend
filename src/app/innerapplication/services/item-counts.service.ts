import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ItemCountsService {

  constructor(private http: HttpClient) { }

  public getArticles() {
    return this.http.get("https://codeama-backend.herokuapp.com/articles?limit=5&page=1")
  }
}
