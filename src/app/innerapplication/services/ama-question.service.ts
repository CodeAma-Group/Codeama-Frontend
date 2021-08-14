import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AmaQuestionService {

  constructor(private http: HttpClient) { }

  getAmaQuestions(userId: string) {
     return this.http.get(`https://codeama-backend.herokuapp.com/codeama/questions/${userId}`)
  }
}
