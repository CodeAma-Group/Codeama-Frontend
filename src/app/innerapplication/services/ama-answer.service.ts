import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AmaAnswerService {

  constructor(private Http:HttpClient) { }
  auth_token = localStorage.getItem('codeama_auth_token');
  userData:any = jwt_decode(this.auth_token)
  
  userId:number= this.userData._id
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token}`,
  });

  questionById(questionId:String){
    return this.Http.get(`https://codeama-backend.herokuapp.com/codeama/questions/question/${questionId}`);
  }

  answerQuestion(data:FormData){
    return this.Http.post(`https://codeama-backend.herokuapp.com/codeama/question/answer`, data, {headers: this.headers});
  }
}
