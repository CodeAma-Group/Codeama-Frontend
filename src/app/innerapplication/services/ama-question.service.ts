import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AmaQuestionService {

  constructor(private http: HttpClient) { }
 
  getAmaQuestions(userId: string) {
     return this.http.get(`https://codeama-backend.onrender.com/codeama/questions/${userId}`)
  }

  questionsForAma(userId: string){
    return this.http.get(`https://codeama-backend.onrender.com/view_questions/person/${userId}`)
  }
}
